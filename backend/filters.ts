import {
  AccountType,
  TweetType,
  Period,
  ListInput,
  AccountBasicFragment,
  CommunityBasicFragment,
} from './__generated__/graphql';
import { dayjsUtc, Dayjs } from '../common/date';
import { ApiTweet } from './twitter';

export interface Filter {
  fields: Partial<ListInput>;
  filterAccountTweets(params: AccountTweet[]): AccountTweet[];
}

export interface AccountTweet {
  account: AccountBasicFragment;
  tweets: ApiTweet[];
}

const createDateTweetFilterFn = (
  startDate: Dayjs,
): ((accountTweets: AccountTweet[]) => AccountTweet[]) => accountTweets =>
  accountTweets.map(accountTweet => ({
    ...accountTweet,
    tweets: accountTweet.tweets.filter(tweet => {
      const tweetCreatedAt = dayjsUtc(tweet.created_at);

      // left inclusive
      return tweetCreatedAt.isAfter(startDate) || tweetCreatedAt.isSame(startDate);
    }),
  }));

export function createDateFilters(currentDate: Dayjs) {
  const dayFilter: Filter = {
    fields: {
      period: Period.Day,
    },
    filterAccountTweets: createDateTweetFilterFn(currentDate.subtract(1, 'day')),
  };

  const weekFilter: Filter = {
    fields: {
      period: Period.Week,
    },
    filterAccountTweets: createDateTweetFilterFn(currentDate.subtract(7, 'day')),
  };

  return [weekFilter, dayFilter];
}

export const createCommunitiesFilters = (communities: CommunityBasicFragment[]): Filter[] =>
  communities.map(community => ({
    fields: {
      community: { connect: community._id },
    },
    filterAccountTweets(accountTweets: AccountTweet[]) {
      return accountTweets.filter(({ account }) =>
        account.communities.data.map(c => c?._id).includes(community._id),
      );
    },
  }));

function isTextTweet(tweet: ApiTweet) {
  return Object.values(tweet.entities).every(entity => entity.length === 0);
}

function isLinkTweet(tweet: ApiTweet) {
  return tweet.entities.urls && tweet.entities.urls.length > 0;
}

function isMediaTweet(tweet: ApiTweet) {
  return tweet.entities.media && tweet.entities.media.length > 0;
}

export const createTweetTypeFilters = (): Filter[] => {
  const typesFilterFns = {
    [TweetType.Link]: isLinkTweet,
    [TweetType.Media]: isMediaTweet,
    [TweetType.Text]: isTextTweet,
  };

  return Object.values(TweetType).map(type => ({
    fields: {
      tweetType: type,
    },
    filterAccountTweets(accountTweets: AccountTweet[]) {
      return accountTweets.map(accountTweet => ({
        account: accountTweet.account,
        tweets: accountTweet.tweets.filter(tweet => typesFilterFns[type](tweet)),
      }));
    },
  }));
};

export const createAccountTypeFilters = (): Filter[] => {
  return Object.values(AccountType).map(accountType => ({
    fields: {
      accountType,
    },
    filterAccountTweets(accountTweets: AccountTweet[]) {
      return accountTweets.filter(accountTweet => accountTweet.account.type === accountType);
    },
  }));
};
