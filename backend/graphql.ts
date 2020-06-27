import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import * as dotenv from 'dotenv';
import fetch from 'cross-fetch';
import {
  AllCommunitiesQuery,
  AllAccountsQuery,
  ListInput,
  CreateListMutation,
  CreateListMutationVariables,
  AccountBasicFragment,
  CommunityBasicFragment,
} from './__generated__/graphql';

dotenv.config();

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    fetch,
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SECRET}`,
    },
  }),
});

export function fetchCommunities() {
  const fragment = gql`
    fragment CommunityBasic on Community {
      _id
      name
    }
  `;

  const ALL_COMMUNITIES = gql`
    query AllCommunities {
      allCommunities {
        data {
          ...CommunityBasic
        }
      }
    }
    ${fragment}
  `;

  return client
    .query<AllCommunitiesQuery>({ query: ALL_COMMUNITIES })
    .then(res => {
      const data = res.data?.allCommunities.data;

      if (!data) {
        throw new Error('Communities query failed to fetch data...');
      }

      return data.filter((datum): datum is CommunityBasicFragment => datum !== null);
    });
}

export function fetchAccounts() {
  const fragment = gql`
    fragment AccountBasic on Account {
      _id
      twitterId
      name
      communities {
        data {
          _id
        }
      }
      type
    }
  `;

  const ALL_ACCOUNTS = gql`
    query AllAccounts {
      allAccounts(_size: 10000) {
        data {
          ...AccountBasic
        }
      }
    }
    ${fragment}
  `;

  return client
    .query<AllAccountsQuery>({ query: ALL_ACCOUNTS })
    .then(res => {
      const data = res.data?.allAccounts.data;

      if (!data) {
        throw new Error('Accounts query failed to fetch data...');
      }

      return data.filter((datum): datum is AccountBasicFragment => datum !== null);
    });
}

export function createList(list: ListInput) {
  const CREATE_LIST = gql`
    mutation CreateList($list: ListInput!) {
      createList(data: $list) {
        _id
      }
    }
  `;

  return client.mutate<CreateListMutation, CreateListMutationVariables>({
    mutation: CREATE_LIST,
    variables: { list },
  });
}
