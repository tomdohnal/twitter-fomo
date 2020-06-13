import { CreateList, CreateListVariables } from './__generated__/CreateList';
import { ListInput } from './../__generated__/globalTypes';
import { AllAccounts } from './__generated__/AllAccounts';
import { AllCommunities } from './__generated__/AllCommunities';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import * as dotenv from 'dotenv';
import fetch from 'cross-fetch';
import { ListValueNode } from 'graphql';

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

  return client.query<AllCommunities>({ query: ALL_COMMUNITIES });
}

export function fetchAccounts() {
  const ALL_ACCOUNTS = gql`
    query AllAccounts {
      allAccounts {
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

  return client.query<AllAccounts>({ query: ALL_ACCOUNTS });
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
