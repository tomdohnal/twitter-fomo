import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPageContext } from 'next';
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client';
import { Box } from '@chakra-ui/core';
import fetch from 'cross-fetch';
import {
  AccountType,
  AllCommunityIdsQuery,
  CommunityIdFragment,
  Period,
  RecentListQuery,
  RecentListQueryVariables,
  Tweet,
  TweetType,
} from '../../__generated__/graphql';
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

interface ListVariable {
  key: Partial<keyof RecentListQueryVariables>;
  value: RecentListQueryVariables[Partial<keyof RecentListQueryVariables>];
}

export function createVariablePermutations({
                                             appliedVariables,
                                             remainingVariables,
                                           }: {
  appliedVariables: ListVariable[];
  remainingVariables: ListVariable[][];
}): Partial<RecentListQueryVariables>[] {
  const variablePermutation: Partial<RecentListQueryVariables> = appliedVariables.reduce(
    (acc, currentVariable) => {
      return { ...acc, [currentVariable.key]: currentVariable.value };
    },
    {},
  );

  const childVariablePermutations: Partial<RecentListQueryVariables>[] = remainingVariables.flatMap(
    (variables, variableIndex) =>
      variables.flatMap(variable => {
        const newAppliedVariables = [...appliedVariables, variable];
        const newRemainingVariables = remainingVariables.slice(variableIndex + 1);

        return createVariablePermutations({
          appliedVariables: newAppliedVariables,
          remainingVariables: newRemainingVariables,
        });
      }),
  );

  return [variablePermutation, ...childVariablePermutations];
}

export const getStaticPaths: GetStaticPaths = async () => {


  const fragment = gql`
      fragment CommunityId on Community {
          _id
      }
  `;

  const ALL_COMMUNITY_IDS = gql`
      query AllCommunityIds {
          allCommunities {
              data {
                  ...CommunityId
              }
          }
      }
      ${fragment}
  `;

  const communityIdVariables: ListVariable[] = await client
    .query<AllCommunityIdsQuery>({
      query: ALL_COMMUNITY_IDS,
    })
    .then(res => {
      const data = res.data?.allCommunities.data;

      if (!data) {
        throw new Error('Recent list failed to fetch data...');
      }

      return data
        .filter((community): community is CommunityIdFragment => community !== null)
        .map(community => ({
          key: 'communityId',
          value: community._id,
        }));
    });

  const periodVariables: ListVariable[] = Object.values(Period).map(period => ({
    key: 'period',
    value: period,
  }));

  const tweetTypeVariables: ListVariable[] = Object.values(TweetType).map(tweetType => ({
    key: 'tweetType',
    value: tweetType,
  }));

  const accountTypeVariables: ListVariable[] = Object.values(AccountType).map(accountType => ({
    key: 'accountType',
    value: accountType,
  }));

  const variablesPermutations = periodVariables.flatMap(periodVariable => {
    return createVariablePermutations({
      appliedVariables: [periodVariable],
      remainingVariables: [communityIdVariables, tweetTypeVariables, accountTypeVariables],
    });
  });

  const paths = variablesPermutations.map(permutation => ({
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
  // @ts-ignore
  const variables = decode(ctx.params.filters);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://graphql.fauna.com/graphql',
      fetch,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_CLIENT_KEY}`,
      },
    }),
  });

  const RECENT_LIST = gql`
      query RecentList(
          $period: Period!
          $communityId: ID
          $tweetType: TweetType
          $accountType: AccountType
      ) {
          recentList(
              period: $period
              communityId: $communityId
              tweetType: $tweetType
              accountType: $accountType
          ) {
              tweetType
              accountType
              period
              community {
                  name
              }
              tweets {
                  data {
                      _id
                      accountName
                      favoritesCount
                      text
                  }
              }
          }
      }
  `;

  const list = await client
    .query<RecentListQuery, RecentListQueryVariables>({
      query: RECENT_LIST,
      variables,
    })
    .then(res => {
      const data = res.data?.recentList;

      if (!data) {
        throw new Error('Recent list failed to fetch data...');
      }

      return data;
    });

  return {
    props: {
      tweets: list.tweets.data.map(tweet => {
        if (tweet === null) {
          throw new Error('Unexpected state: tweet is null...');
        }

        return tweet;
      }),
    },
  };
};

const LeaderBoard: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ tweets }) => {
  return (
    <Box>
      <ol>
        {tweets.map(tweet => {
          return <TweetBox key={tweet._id} text={tweet.text} />;
        })}
      </ol>
    </Box>
  );
};

export default LeaderBoard;
