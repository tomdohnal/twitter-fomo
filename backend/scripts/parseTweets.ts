import Twitter from 'twitter-lite';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import axios from 'axios';
import R from 'ramda';
import { promisify } from 'util';
import * as dotenv from 'dotenv';

export interface ApiTweet {
  id: number;
  entities: { urls: Array<any>; media: Array<any> };
  favorite_count: number;
  created_at: string;
  id_str: string;
  full_text: string;
  user: {
    name: string;
  };
  __accountId: string;
}

export interface Account {
  _id: string;
  twitterId: string;
  communities: {
    data: Community[];
  };
  name: string;
}

export interface Filter {
  fields: { [key: string]: any };
  filterTweets(params: { account: Account; tweets: Array<ApiTweet> }): ApiTweet[];
}

export interface Community {
  _id: string;
  name: string;
}

export interface AccountTweet {
  account: Account;
  tweets: ApiTweet[];
}

export interface Tweet {
  twitterId: string;
  publishedAt: string;
  text: string;
  accountName: string;
  account: { connect: string };
  favoritesCount: number;
}

type TweetType = 'ALL' | 'TEXT' | 'MEDIA' | 'LINK';

export interface ListObject {
  tweetType: TweetType;
  tweets: {
    create: Tweet[];
  };
}

dotenv.config();

dayjs.extend(utc);

const sleep = promisify(setTimeout);

const DAY_NOW = dayjs.utc().startOf('day');
const DAY_BEFORE_ONE_WEEK = DAY_NOW.subtract(1, 'week');

const createQuery = (query: string, variables?: object) => {
  return axios
    .post(
      'https://graphql.fauna.com/graphql',
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FAUNA_SECRET}`,
        },
      },
    )
    .then(R.prop('data'));
};

const logger = {
  error(err: Error) {
    // TODO: add Sentry or similar
    console.error(err);
  },
};

const getApp = () =>
  Promise.resolve(
    new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
    }),
  )
    .then(user => user.getBearerToken())
    .then(response => {
      return new Twitter({
        // @ts-ignore
        bearer_token: response.access_token,
      });
    });

async function pauseExecution(resetTimestamp: number) {
  const currentTimestamp = Date.now() / 1000;

  // + 5 is to allow for possible rounding errors / mistakes
  await sleep((resetTimestamp - currentTimestamp + 5) * 1000);
}

async function fetchTweetsForAccount({
  accountId,
  twitterId,
  app,
  startDate,
  endDate,
}: {
  accountId: string;
  twitterId: string;
  app: Twitter;
  startDate: Dayjs;
  endDate: Dayjs;
}): Promise<ApiTweet[]> {
  let tweets: ApiTweet[] = [];
  let lastTweetDate = null;

  do {
    const lastTweet = tweets[tweets.length - 1];
    const lastTweetId = lastTweet && lastTweet.id;

    // eslint-disable-next-line no-await-in-loop
    const fetchedTweets = await app
      .get('statuses/user_timeline', {
        user_id: twitterId,
        count: 200,
        include_rts: false,
        exclude_replies: true,
        tweet_mode: 'extended',
        ...(lastTweetId && { max_id: lastTweetId }),
      })
      .then(async res => {
        const apiLimitRemaining = parseInt(
          // eslint-disable-next-line no-underscore-dangle
          res._headers.get('x-rate-limit-remaining'),
          10,
        );

        console.log({ apiLimitRemaining });

        if (apiLimitRemaining === 0) {
          const resetTimestamp = parseInt(
            // eslint-disable-next-line no-underscore-dangle
            res._headers.get('x-rate-limit-reset'),
            10,
          );

          await pauseExecution(resetTimestamp);
        }

        return res;
      })
      .catch(async err => {
        logger.error(err);

        // handle limit exceeded
        if (err.errors[0].code === 88) {
          console.log('sleeping');
          await sleep(60000); // sleep for 1 minute
        }
      });

    lastTweetDate = dayjs.utc(fetchedTweets[fetchedTweets.length - 1].created_at);

    tweets = tweets.concat(fetchedTweets);
  } while (endDate.isBefore(lastTweetDate));

  // TODO: possible perf boost - the tweets are sorted
  // by date so you can leverage that when filtering.
  // But premature optimization for now IMO
  return tweets
    .filter(tweet => {
      const tweetDate = dayjs.utc(tweet.created_at);

      return tweetDate.isAfter(startDate) && tweetDate.isBefore(endDate);
    })
    .map(R.assoc('__accountId', accountId));
}

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

  const textTweets: Array<ApiTweet & { __accountId: string }> = [];
  const mediaTweets: Array<ApiTweet & { __accountId: string }> = [];
  const linkTweets: Array<ApiTweet & { __accountId: string }> = [];

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

function fetchCommunities(): Promise<Community[]> {
  const allCommunitiesQuery = /* GraphQL */ `
    {
      allCommunities {
        data {
          _id
          name
        }
      }
    }
  `;

  return createQuery(allCommunitiesQuery).then(
    R.path(['data', 'allCommunities', 'data']),
  ) as Promise<Community[]>;
}

function fetchAccounts(): Promise<Account[]> {
  const allAccountsQuery = /* GraphQL */ `
    query {
      allAccounts {
        data {
          _id
          twitterId
          name
          communities {
            data {
              _id
            }
          }
          type
        }
      }
    }
  `;

  return createQuery(allAccountsQuery).then(R.path(['data', 'allAccounts', 'data'])) as Promise<
    Account[]
  >;
}

function getSortedTweets(tweets: Array<ApiTweet>) {
  return R.sort((a, b) => b.favorite_count - a.favorite_count, tweets);
}

export function getDaysInInterval({ startDay, daysCount }: { startDay: Dayjs; daysCount: number }) {
  return R.range(0, daysCount).map(i => ({
    startDate: startDay.add(i, 'day'),
    endDate: startDay.add(i + 1, 'day'),
  }));
}

function createList(list: ListObject) {
  return createQuery(
    /* GraphQL */ `
      mutation createList($list: ListInput!) {
        createList(data: $list) {
          _id
        }
      }
    `,
    { list },
  );
}

const createListObject = ({
  tweetType,
  tweets,
  appliedFilters,
}: {
  tweetType: TweetType;
  tweets: (ApiTweet & { __accountId: string })[];
  appliedFilters: Filter[];
}) => ({
  ...R.mergeAll(appliedFilters.map(R.prop('fields'))),
  tweetType,
  tweets: {
    create: tweets.map(tweet => ({
      twitterId: tweet.id_str,
      publishedAt: dayjs(tweet.created_at).toISOString(),
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
      tweetType: 'ALL',
      tweets: allTweets,
      appliedFilters,
    }),
    createListObject({
      tweetType: 'TEXT',
      tweets: textTweets,
      appliedFilters,
    }),
    createListObject({
      tweetType: 'MEDIA',
      tweets: mediaTweets,
      appliedFilters,
    }),
    createListObject({
      tweetType: 'LINK',
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

export const createDateTweetFilterFn = ({
  startDate,
  endDate,
}: {
  startDate: Dayjs;
  endDate: Dayjs;
}): (() => ApiTweet[]) =>
  R.pipe(
    R.prop('tweets'),
    // @ts-ignore
    R.filter((tweet: ApiTweet) => {
      const tweetDate = dayjs.utc(tweet.created_at);

      return tweetDate.isAfter(startDate) && tweetDate.isBefore(endDate);
    }),
  );

export const createCommunitiesFilters = (communities: Community[]): Filter[] =>
  communities.map(community => ({
    fields: {
      community: { connect: community._id },
    },
    filterTweets({ account, tweets }) {
      return account.communities.data.map(R.prop('_id')).includes(community._id) ? tweets : [];
    },
  }));

export function getDateFilters() {
  const dayFilters: Filter[] = getDaysInInterval({
    startDay: DAY_BEFORE_ONE_WEEK,
    daysCount: 7,
  }).map(({ startDate, endDate }) => ({
    fields: {
      period: 'DAY',
      startDate: startDate.toISOString(),
    },
    filterTweets: createDateTweetFilterFn({ startDate, endDate }),
  }));

  const weekFilter: Filter = {
    fields: {
      period: 'WEEK',
      startDate: DAY_BEFORE_ONE_WEEK.toISOString(),
    },
    filterTweets: createDateTweetFilterFn({
      startDate: DAY_BEFORE_ONE_WEEK,
      endDate: DAY_NOW,
    }),
  };

  // default list is going to be full week
  return [weekFilter, ...dayFilters];
}

async function run() {
  const twitterApp = await getApp();

  const accounts: Array<Account> = await fetchAccounts();

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

// run();
// createList().then(console.log)
