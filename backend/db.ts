import * as dotenv from 'dotenv';
import { PrismaClient, TweetCreateInput } from '@prisma/client';

dotenv.config();

export const prisma = new PrismaClient();

export function fetchCommunities() {
  return prisma.community.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

export function fetchAccounts() {
  return prisma.account.findMany({
    select: {
      id: true,
      twitterId: true,
      name: true,
      type: true,
      communities: {
        select: {
          id: true,
        },
      },
    },
  });
}

export async function createTweetList(tweetList: TweetCreateInput[]) {
  const requests = tweetList.map(tweet =>
    prisma.tweet.upsert({
      create: tweet,
      update: tweet,
      where: { twitterId: tweet.twitterId },
    }),
  );

  return prisma.$transaction(requests);
}
