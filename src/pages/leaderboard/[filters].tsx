import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPageContext } from 'next';
import { Box } from '@chakra-ui/core';
import { PrismaClient, ListWhereInput, AccountType, Period, TweetType } from '@prisma/client';

import TweetBox from '../../components/TweetBox';

const decode = (encodedString: string) => {
  let decodedString;

  if (typeof window === 'undefined') {
    decodedString = Buffer.from(encodedString, 'base64').toString('binary');
  } else {
    decodedString = window.atob(encodedString);
  }

  return JSON.parse(decodedString);
};

const encode = (object: Record<string, unknown>) => {
  const string = JSON.stringify(object);

  if (typeof window === 'undefined') {
    return Buffer.from(string).toString('base64');
  }

  return window.btoa(string);
};

export function createVariablePermutations({
  appliedVariables,
  remainingVariableSets,
}: {
  appliedVariables: ListWhereInput;
  remainingVariableSets: ListWhereInput[][];
}): ListWhereInput[] {
  const childVariablePermutations: ListWhereInput[] = remainingVariableSets.flatMap(
    (variables, variableIndex) =>
      variables.flatMap((variable) => {
        const newAppliedVariables = { ...appliedVariables, ...variable };
        const newRemainingVariableSets = remainingVariableSets.slice(variableIndex + 1);

        return createVariablePermutations({
          appliedVariables: newAppliedVariables,
          remainingVariableSets: newRemainingVariableSets,
        });
      }),
  );

  return [appliedVariables, ...childVariablePermutations];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();

  const communityVariables: ListWhereInput[] = (await prisma.community.findMany()).map(
    (community) => ({
      community: { id: community.id },
    }),
  );

  const periodVariables: ListWhereInput[] = Object.values(Period).map((period) => ({
    period,
  }));

  const tweetTypeVariables: ListWhereInput[] = Object.values(TweetType).map((tweetType) => ({
    tweetType,
  }));

  const accountTypeVariables: ListWhereInput[] = Object.values(AccountType).map((accountType) => ({
    accountType,
  }));

  const variablesPermutations = periodVariables.flatMap((periodVariable) => {
    return createVariablePermutations({
      appliedVariables: periodVariable,
      remainingVariableSets: [communityVariables, tweetTypeVariables, accountTypeVariables],
    });
  });

  const paths = variablesPermutations.map((permutation) => ({
    params: {
      filters: encode(permutation),
    },
  }));

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx: unknown) => {
  const prisma = new PrismaClient();

  // @ts-ignore
  const variables = decode(ctx.params.filters);

  const list = await prisma.list.findMany({
    where: variables,
    select: {
      tweetType: true,
      accountType: true,
      period: true,
      community: {
        select: {
          name: true,
        }
      },
      tweets: {
        select: {
          id: true,
          accountName: true,
          favoritesCount: true,
          text: true,
        }
      }
    }
  });


  return {
    props: { list },
  };
};

const LeaderBoard: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ list }) => {
  return (
    <Box>
      <ol>
        {list.tweets.map((tweet) => {
          return <TweetBox key={tweet._id} text={tweet.text} />;
        })}
      </ol>
    </Box>
  );
};

export default LeaderBoard;
