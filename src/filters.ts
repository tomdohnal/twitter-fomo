import { TweetWhereInput, TweetType, AccountType } from '@prisma/client';
import dayjs from 'dayjs';

export interface Filters {
  period: string;
  communities: string[];
  tweetTypes: TweetType[];
  accountTypes: AccountType[];
}

export const decode = (encodedString: string): Filters => {
  let decodedString;

  if (typeof window === 'undefined') {
    decodedString = Buffer.from(encodedString, 'base64').toString('binary');
  } else {
    decodedString = window.atob(encodedString);
  }

  return JSON.parse(decodedString);
};

export const encode = (object: Record<string, unknown>) => {
  const string = JSON.stringify(object);

  if (typeof window === 'undefined') {
    return Buffer.from(string).toString('base64');
  }

  return window.btoa(string);
};

export const urlFiltersToWhereInput = ({
  period,
  communities,
  tweetTypes,
  accountTypes,
}: Filters): TweetWhereInput => {
  const communitiesWhere =
    communities.length === 0
      ? {}
      : {
          communities: {
            some: {
              OR: communities.map(community => ({
                name: community,
              })),
            },
          },
        };

  const accountTypeWhere =
    accountTypes.length === 0
      ? {}
      : {
          type: {
            in: accountTypes,
          },
        };

  const tweetTypesWhere =
    tweetTypes.length === 0 ? {} : { OR: tweetTypes.map(type => ({ tweetTypes: type })) };

  return {
    publishedAt: {
      gte: dayjs()
        .subtract(1, period === 'DAY' ? 'day' : 'week')
        .toISOString(),
    },
    account: {
      ...communitiesWhere,
      ...accountTypeWhere,
    },
    ...tweetTypesWhere,
  };
};
