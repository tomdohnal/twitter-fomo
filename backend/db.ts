import * as dotenv from 'dotenv';
import { PrismaClient, TweetCreateInput } from '@prisma/client';
import { scrapeMetadata } from './metadata';
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
  const requests = tweetList.map(async tweet => {
    // @ts-ignore
    const url = tweet.payload.entities?.urls[0] || tweet.payload?.quoted_status?.entities?.urls[0];

    const linkAttributes = await (url
      ? scrapeMetadata(url.expanded_url).then(metadata => ({
          linkTitle: metadata.title,
          linkDescription: metadata.description,
          linkImageUrl: metadata.imageUrl,
          linkUrl: url.expanded_url,
        }))
      : {});

    const enhancedTweet = {
      ...linkAttributes,
      ...tweet,
    };

    return prisma.tweet.upsert({
      create: enhancedTweet,
      update: enhancedTweet,
      where: { twitterId: tweet.twitterId },
    });
  });

  return prisma.$transaction(requests);
}
