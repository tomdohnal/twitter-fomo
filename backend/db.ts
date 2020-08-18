import * as dotenv from 'dotenv';
import { PrismaClient, ListCreateInput, TweetCreateInput } from '@prisma/client';

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

export async function createList({
  tweetInputs,
  listInput,
}: {
  tweetInputs: TweetCreateInput[];
  listInput: ListCreateInput;
}) {
  const requests = tweetInputs.map((tweetInput) =>
    prisma.tweet.upsert({
      create: tweetInput,
      update: tweetInput,
      where: { twitterId: tweetInput.twitterId },
    }),
  );

  await prisma.$transaction(requests)

  return prisma.list.create({ data: listInput });
}
