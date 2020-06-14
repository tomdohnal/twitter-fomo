import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import * as dotenv from 'dotenv';
import fetch from 'cross-fetch';
import { CreateList, CreateListVariables } from './__generated__/CreateList';
import { ListInput } from '../__generated__/globalTypes';
import { AllAccounts, AllAccounts_allAccounts_data } from './__generated__/AllAccounts';
import { AllCommunities, AllCommunities_allCommunities_data } from './__generated__/AllCommunities';

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
  const ALL_COMMUNITIES = gql`
    query AllCommunities {
      allCommunities {
        data {
          _id
          name
        }
      }
    }
  `;

  return client
    .query<AllCommunities>({ query: ALL_COMMUNITIES })
    .then(res => {
      const data = res.data?.allCommunities.data;

      if (!data) {
        throw new Error('Communities query failed to fetch data...');
      }

      return data as AllCommunities_allCommunities_data[];
    });
}

export function fetchAccounts() {
  // only fetches 50 accounts?
  const ALL_ACCOUNTS = gql`
    query AllAccounts {
      allAccounts(_size: 10000) {
        data {
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
      }
    }
  `;

  return client
    .query<AllAccounts>({ query: ALL_ACCOUNTS })
    .then(res => {
      const data = res.data?.allAccounts.data;

      if (!data) {
        throw new Error('Accounts query failed to fetch data...');
      }

      return data as AllAccounts_allAccounts_data[];
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

  return client.mutate<CreateList, CreateListVariables>({
    mutation: CREATE_LIST,
    variables: { list },
  });
}
