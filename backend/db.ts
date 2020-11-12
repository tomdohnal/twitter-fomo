import * as dotenv from 'dotenv';
import { PrismaClient, TweetCreateInput } from '@prisma/client';
import { scrapeMetadata } from './metadata';
import { Status } from 'twitter-d';
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
  const enhancedTweetList = await Promise.all(
    tweetList.map(async (tweet) => {
      const payload: Status = (tweet.payload as unknown) as Status;
      const url = payload.entities.urls?.[0] || payload.quoted_status?.entities?.urls?.[0];

      const linkAttributes = await (url
        ? scrapeMetadata(url.expanded_url as string).then((metadata) => ({
            linkTitle: metadata.title,
            linkDescription: metadata.description,
            linkImageUrl: metadata.imageUrl,
            linkUrl: url.expanded_url,
          }))
        : {});

      return {
        ...linkAttributes,
        ...tweet,
      };
    }),
  );

  const requests = enhancedTweetList.map((tweet) => {
    return prisma.tweet.upsert({
      create: tweet,
      update: tweet,
      where: { twitterId: tweet.twitterId },
    });
  });

  return prisma.$transaction(requests);
}
