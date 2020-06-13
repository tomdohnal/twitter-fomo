import { Period } from './../__generated__/globalTypes';
import { dayjsUtc } from './../common/date';
import { AllAccounts_allAccounts_data } from './__generated__/AllAccounts';
import * as R from 'ramda';
import { AllCommunities_allCommunities_data } from './__generated__/AllCommunities';
import { ApiTweet } from './twitter';
import { Dayjs } from '../common/date';
import { ListInput } from '../__generated__/globalTypes';

export interface Filter {
  fields: Partial<ListInput>;
  filterAccountTweets(params: AccountTweet[]): AccountTweet[];
}

export interface AccountTweet {
  account: AllAccounts_allAccounts_data;
  tweets: ApiTweet[];
}

const createDateTweetFilterFn = ({
  startDate,
  endDate,
}: {
  startDate: Dayjs;
  endDate: Dayjs;
}): ((accountTweets: AccountTweet[]) => AccountTweet[]) => accountTweets =>
  accountTweets.map(accountTweet => ({
    ...accountTweet,
    tweets: accountTweet.tweets.filter(tweet => {
      const tweetCreatedAt = dayjsUtc(tweet.created_at);

      // left inclusive
      return (
        (tweetCreatedAt.isAfter(startDate) && tweetCreatedAt.isBefore(endDate)) ||
        tweetCreatedAt.isSame(startDate)
      );
    }),
  }));

function getDaysInInterval({ startDate, daysCount }: { startDate: Dayjs; daysCount: number }) {
  return R.range(0, daysCount).map(i => ({
    startDate: startDate.add(i, 'day'),
    endDate: startDate.add(i + 1, 'day'),
  }));
}

export function createDateFilters({ startDate, endDate }: { startDate: Dayjs; endDate: Dayjs }) {
  const dayFilters: Filter[] = getDaysInInterval({
    startDate,
    daysCount: endDate.diff(startDate, 'day'),
  }).map(({ startDate, endDate }) => ({
    fields: {
      period: Period.DAY,
      startDate: startDate.toISOString(),
    },
    filterAccountTweets: createDateTweetFilterFn({ startDate, endDate }),
  }));

  const weekFilter: Filter = {
    fields: {
      period: Period.WEEK,
      startDate: startDate.toISOString(),
    },
    filterAccountTweets: createDateTweetFilterFn({
      startDate: startDate,
      endDate: endDate,
    }),
  };

  // default list is going to be full week
  return [weekFilter, ...dayFilters];
}

export const createCommunitiesFilters = (
  communities: AllCommunities_allCommunities_data[],
): Filter[] =>
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
