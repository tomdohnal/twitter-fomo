import { ListCreateInput } from '@prisma/client';
import R from 'ramda';
import {
  AccountType,
  TweetType,
  Period,
} from './__generated__/graphql';
import { dayjsUtc, Dayjs } from '../common/date';
import { ApiTweet } from './twitter';

export interface Filter {
  fields: Partial<ListCreateInput>;
  filterAccountTweets(params: AccountTweet[]): AccountTweet[];
}

export interface AccountTweet {
  account: {
    id: number,
    twitterId: string,
    name: string,
    type: "PERSONAL" | "BUSINESS",
    communities: { id: number }[]
  };
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

export const createCommunitiesFilters = (communities: {name: string, id: number}[]): Filter[] =>
  communities.map(community => ({
    fields: {
      community: { connect: { id: community.id } },
    },
    filterAccountTweets(accountTweets: AccountTweet[]) {
      return accountTweets.filter(({ account }) =>
        account.communities.map(R.prop('id')).includes(community.id),
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
