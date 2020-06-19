import * as R from 'ramda';
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
import { fetchCommunities, fetchAccounts, createList } from '../graphql';
import logger from '../logger';

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
    logger.log(`Fetching tweets for ${account.name} (${account.twitterId})`);
    // eslint-disable-next-line no-await-in-loop
    await fetchTweetsForAccount({
      accountId: account._id,
      twitterId: account.twitterId,
      app: twitterApp,
      startDate: DAY_BEFORE_ONE_WEEK,
    })
      .then(tweets => {
        logger.log(`Success: Fetched tweets for ${account.name} (${account.twitterId})`);

        sortedAccountTweets.push({ account, tweets: getSortedTweets(tweets) });
      })
      .catch(() => {
        logger.error(
          new Error(`Error: failed to fetched tweet for ${account.name} (${account.twitterId})`),
        );
      });
  }

  const communities = await fetchCommunities();

  const dateFilters = createDateFilters(DAY_NOW);
  const communitiesFilters = createCommunitiesFilters(communities);
  const tweetTypeFilters = createTweetTypeFilters();
  const accountTypeFilters = createAccountTypeFilters();

  // we treat `dateFilters` as an exception now as they always must be present...
  logger.log('Created list inputs');
  const listInputs = dateFilters.flatMap(dateFilter => {
    const filteredSortedAccountTweets = dateFilter.filterAccountTweets(sortedAccountTweets);

    return createListInputs({
      sortedAccountTweets: filteredSortedAccountTweets,
      appliedFilters: [dateFilter],
      remainingFilters: [tweetTypeFilters, communitiesFilters, accountTypeFilters],
    });
  });
  logger.log('Success: list inputs created');

  // eslint-disable-next-line no-restricted-syntax
  for (const listInput of listInputs) {
    logger.log('Uploading list input', { listInput });
    // eslint-disable-next-line no-await-in-loop
    await createList(listInput)
      .then(() => {
        logger.log('Success: list input');
      })
      .catch(() => {
        logger.error(new Error('Error: failed to upload list input'));
      });
  }
}
