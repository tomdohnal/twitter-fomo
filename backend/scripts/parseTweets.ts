import { TweetType } from './../../__generated__/globalTypes';
import { ApiTweet, getApp } from './../twitter';
import R from 'ramda';
import * as dotenv from 'dotenv';
import { dayjsUtc, Dayjs, DAY_BEFORE_ONE_WEEK, DAY_NOW } from '../../common/date';
import { fetchCommunities } from '../graphql';

dotenv.config();

function isTextTweet(tweet: ApiTweet) {
  return Object.values(tweet.entities).every(entity => entity.length === 0);
}

function isLinkTweet(tweet: ApiTweet) {
  return tweet.entities.urls && tweet.entities.urls.length > 0;
}

function isMediaTweet(tweet: ApiTweet) {
  return tweet.entities.media && tweet.entities.media.length > 0;
}

function getTopTweets(tweets: Array<ApiTweet>) {
  const sortedTweets: Array<ApiTweet> = R.sort(
    (a: ApiTweet, b: ApiTweet) => b.favorite_count - a.favorite_count,
    tweets,
  );

  const textTweets: ApiTweet[] = [];
  const mediaTweets: ApiTweet[] = [];
  const linkTweets: ApiTweet[] = [];

  sortedTweets.forEach(tweet => {
    isTextTweet(tweet) && textTweets.push(tweet);
    isMediaTweet(tweet) && mediaTweets.push(tweet);
    isLinkTweet(tweet) && linkTweets.push(tweet);
  });

  return {
    allTweets: sortedTweets.slice(0, 10),
    textTweets: textTweets.slice(0, 10),
    mediaTweets: mediaTweets.slice(0, 10),
    linkTweets: linkTweets.slice(0, 10),
  };
}

function getSortedTweets(tweets: Array<ApiTweet>) {
  return R.sort((a, b) => b.favorite_count - a.favorite_count, tweets);
}

const createListObject = ({
  tweetType,
  tweets,
  appliedFilters,
}: {
  tweetType: TweetType;
  tweets: ApiTweet[];
  appliedFilters: Filter[];
}) => ({
  ...R.mergeAll(appliedFilters.map(R.prop('fields'))),
  tweetType,
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
});

export function getListObjects({
  sortedAccountTweets,
  appliedFilters,
  remainingFilters,
}: {
  sortedAccountTweets: { tweets: ApiTweet[]; account: Account }[];
  appliedFilters: Array<Filter>;
  remainingFilters: Array<Array<Filter>>;
}): ListObject[] {
  const { textTweets, mediaTweets, linkTweets, allTweets } = getTopTweets(
    sortedAccountTweets.flatMap(R.prop('tweets')),
  );

  const lists = [
    createListObject({
      tweetType: TweetType.ALL,
      tweets: allTweets,
      appliedFilters,
    }),
    createListObject({
      tweetType: TweetType.TEXT,
      tweets: textTweets,
      appliedFilters,
    }),
    createListObject({
      tweetType: TweetType.MEDIA,
      tweets: mediaTweets,
      appliedFilters,
    }),
    createListObject({
      tweetType: TweetType.LINK,
      tweets: linkTweets,
      appliedFilters,
    }),
  ];

  const childLists = remainingFilters.flatMap(filters =>
    filters.flatMap(filter => {
      const filteredSortedAccountTweets = sortedAccountTweets.map(({ account, tweets }) => ({
        account,
        tweets: filter.filterTweets({ account, tweets }),
      }));

      const newAppliedFilters = [...appliedFilters, filter];
      const newRemainingFilters = R.reject(R.equals(filters), remainingFilters);

      return getListObjects({
        sortedAccountTweets: filteredSortedAccountTweets,
        appliedFilters: newAppliedFilters,
        remainingFilters: newRemainingFilters,
      });
    }),
  );

  return [...lists, ...childLists];
}

export async function run() {
  const twitterApp = await getApp();

  const accounts = await fetchAccounts();

  const sortedAccountTweets: AccountTweet[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const account of accounts) {
    // eslint-disable-next-line no-await-in-loop
    const tweets = (await fetchTweetsForAccount({
      accountId: account._id,
      twitterId: account.twitterId,
      app: twitterApp,
      startDate: DAY_BEFORE_ONE_WEEK,
      endDate: DAY_NOW,
    })) as ApiTweet[];

    sortedAccountTweets.push({ account, tweets: getSortedTweets(tweets) });
  }

  const communities = await fetchCommunities();

  const communitiesFilters: Filter[] = createCommunitiesFilters(communities);

  const dateFilters = getDateFilters();

  const lists = getListObjects({
    sortedAccountTweets,
    appliedFilters: [],
    remainingFilters: [dateFilters, communitiesFilters],
  });
}
