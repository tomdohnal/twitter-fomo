import React from 'react';
import { GetStaticProps } from 'next';
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import {
  RecentListQuery,
  RecentListQueryVariables,
  Period,
  AccountType,
  TweetType,
  AllCommunityIdsQuery,
  CommunityIdFragment,
} from '../../__generated__/graphql';

interface Tweet {
  id: number;
  name: string;
  text: string;
  favoritesCount: string;
}

interface Props {
  tweets: Tweet[];
}

const LeaderBoard: React.FC<Props> = ({ tweets }) => {
  return (
    <ol>
      {tweets.map(tweet => {
        return (
          <li key={tweet.id}>
            <div>{tweet.name}</div>
            <div>{tweet.text}</div>
            <div>{tweet.favoritesCount}</div>
          </li>
        );
      })}
    </ol>
  );
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

export const getStaticPaths = async () => {
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
      filters: JSON.stringify(permutation)
        .replace(/:/g, '___')
        .replace(/,/, '---'),
    },
  }));

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  // @ts-ignore
  const variables = JSON.parse(ctx.params.filters.replace(/___/g, ':').replace(/---/, ','));

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

        return {
          id: tweet._id,
          name: tweet.accountName,
          text: tweet.text,
          favoritesCount: tweet.favoritesCount,
        };
      }),
    },
  };
};

export default LeaderBoard;
