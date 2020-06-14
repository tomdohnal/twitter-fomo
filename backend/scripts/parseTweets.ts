import R from 'ramda';
import {
  createTweetTypeFilters,
  createAccountTypeFilters,
  Filter,
  AccountTweet,
  createCommunitiesFilters,
  createDateFilters,
} from '../filters';
import { ListInput } from '../../__generated__/globalTypes';
import { ApiTweet, getApp, fetchTweetsForAccount } from '../twitter';
import { dayjsUtc, DAY_BEFORE_ONE_WEEK, DAY_NOW } from '../../common/date';
import { fetchCommunities, fetchAccounts } from '../graphql';

function getTopTweets(tweets: Array<ApiTweet>) {
  const sortedTweets = R.sort((a, b) => b.favorite_count - a.favorite_count, tweets);

  return sortedTweets.slice(0, 10);
}

function getSortedTweets(tweets: Array<ApiTweet>) {
  return R.sort((a, b) => b.favorite_count - a.favorite_count, tweets);
}

const createListInput = ({
  tweets,
  appliedFilters,
}: {
  tweets: ApiTweet[];
  appliedFilters: Filter[];
}) =>
  ({
    ...R.mergeAll(appliedFilters.map(R.prop('fields'))),
    tweets: {
      create: tweets.map(tweet => ({
        twitterId: tweet.id_str,
        publishedAt: dayjsUtc(tweet.created_at).toISOString(),
        text: tweet.full_text,
        accountName: tweet.user.name,
        account: { connect: tweet.__accountId },
        favoritesCount: tweet.favorite_count,
      })),
    },
  } as ListInput);

export function createListInputs({
  sortedAccountTweets,
  appliedFilters,
  remainingFilters,
}: {
  sortedAccountTweets: AccountTweet[];
  appliedFilters: Array<Filter>;
  remainingFilters: Array<Array<Filter>>;
}): ListInput[] {
  const topTweets = getTopTweets(sortedAccountTweets.flatMap(R.prop('tweets')));

  const listInput = createListInput({
    tweets: topTweets,
    appliedFilters,
  });

  const childLists = remainingFilters.flatMap((filters, filtersIndex) =>
    filters.flatMap(filter => {
      const filteredSortedAccountTweets = filter.filterAccountTweets(sortedAccountTweets);

      const newAppliedFilters = [...appliedFilters, filter];
      const newRemainingFilters = remainingFilters.slice(filtersIndex + 1);

      return createListInputs({
        sortedAccountTweets: filteredSortedAccountTweets,
        appliedFilters: newAppliedFilters,
        remainingFilters: newRemainingFilters,
      });
    }),
  );

  return [listInput, ...childLists];
}

export async function run() {
  const twitterApp = await getApp();

  const accounts = await fetchAccounts();

  const sortedAccountTweets: AccountTweet[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const account of accounts) {
    // eslint-disable-next-line no-await-in-loop
    const tweets = await fetchTweetsForAccount({
      accountId: account._id,
      twitterId: account.twitterId,
      app: twitterApp,
      startDate: DAY_BEFORE_ONE_WEEK,
      endDate: DAY_NOW,
    });

    sortedAccountTweets.push({ account, tweets: getSortedTweets(tweets) });
  }

  const communities = await fetchCommunities();

  const dateFilters = createDateFilters({ startDate: DAY_BEFORE_ONE_WEEK, endDate: DAY_NOW });
  const communitiesFilters = createCommunitiesFilters(communities);
  const tweetTypeFilters = createTweetTypeFilters();
  const accountTypeFilters = createAccountTypeFilters();

  // we treat `dateFilters` as an exception now as they always must be present...
  const listsInputs = dateFilters.flatMap(dateFilter => {
    const filteredSortedAccountTweets = dateFilter.filterAccountTweets(sortedAccountTweets);

    return createListInputs({
      sortedAccountTweets: filteredSortedAccountTweets,
      appliedFilters: [dateFilter],
      remainingFilters: [tweetTypeFilters, communitiesFilters, accountTypeFilters],
    });
  });
}
