import { DEFAULT_FILTER } from './../constants';
import { TweetWhereInput } from '@prisma/client';
import dayjs from 'dayjs';
import { decode, Filters } from '../filters';
import prisma from '../prisma';

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
              OR: communities.map((community) => ({
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
            in: (accountTypes as unknown) as 'PERSONAL' | 'BUSINESS',
          },
        };

  const tweetTypesWhere =
    tweetTypes.length === 0
      ? {}
      : {
          tweetTypes: {
            some: {
              OR: tweetTypes.map((type) => ({
                name: type,
              })),
            },
          },
        };

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

export const get = async (filterUrl: string) => {
  const urlFilters = decode(filterUrl || DEFAULT_FILTER);
  const where = urlFiltersToWhereInput(urlFilters);

  const tweets = await prisma.tweet.findMany({
    where,
    select: {
      id: true,
      accountName: true,
      favoritesCount: true,
      retweetsCount: true,
      text: true,
      publishedAt: true,
      accountProfileImageUrl: true,
      accountScreenName: true,
      payload: true,
    },
    orderBy: {
      favoritesCount: 'desc',
    },
    take: 10,
  });

  return tweets.map((tweet) => ({
    ...tweet,
    publishedAt: tweet.publishedAt.toDateString(),
  }));
};
