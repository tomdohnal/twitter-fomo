import { dayjsUtc } from './../common/date';
import faker from 'faker';
import { ApiTweet } from './twitter';
import { AllCommunities_allCommunities_data } from './__generated__/AllCommunities';
import { AccountType } from './../__generated__/globalTypes';
import {
  AllAccounts_allAccounts_data,
  AllAccounts_allAccounts_data_communities_data,
} from './__generated__/AllAccounts';

let accountId = 0;
let accountTwitterId = 0;

// this makes generated fake data consistent across multiple test runs
faker.seed(0);

export const createAccount = ({
  communities,
  _id,
  name,
  twitterId,
  type,
}: {
  communities?: AllAccounts_allAccounts_data_communities_data[];
  _id?: string;
  name?: string;
  twitterId?: string;
  type?: AccountType;
} = {}): AllAccounts_allAccounts_data => {
  return {
    _id: _id || faker.random.uuid(),
    name: name || faker.internet.userName(),
    twitterId: twitterId || faker.random.uuid(),
    type: type || AccountType.PERSONAL,
    communities: {
      data: communities || [createCommunity()],
    },
  };
};

export const COMMUNITIES: AllCommunities_allCommunities_data[] = [
  {
    _id: '1',
    name: 'React',
  },
  {
    _id: '2',
    name: 'Vue',
  },
];

export const createCommunity = ({
  _id,
  name,
}: { _id?: string; name?: string } = {}): AllCommunities_allCommunities_data => ({
  _id: _id || faker.random.uuid(),
  name: name || faker.internet.domainName(),
});

export const createTweet = ({
  created_at,
  favorite_count,
  media,
  urls,
}: {
  created_at?: string;
  favorite_count?: number;
  media?: any[];
  urls?: any[];
} = {}): ApiTweet => ({
  created_at: created_at || dayjsUtc(faker.date.past()).toISOString(),
  entities: {
    media: media || [],
    urls: urls || [],
  },
  favorite_count: favorite_count || faker.random.number(),
  __accountId: faker.random.uuid(),
  full_text: faker.lorem.sentence(),
  id: faker.random.number(),
  id_str: String(faker.random.number()),
  user: {
    name: faker.internet.userName(),
  },
});

const createTextTweet = ({
  created_at,
  favorite_count,
}: {
  created_at: string;
  favorite_count: number;
}) => createTweet({ created_at, favorite_count, media: [], urls: [] });

const createMediaTweet = ({
  created_at,
  favorite_count,
}: {
  created_at: string;
  favorite_count: number;
}) =>
  createTweet({
    created_at,
    favorite_count,
    media: ['random stuff'],
    urls: [],
  });

const createLinkTweet = ({
  created_at,
  favorite_count,
}: {
  created_at: string;
  favorite_count: number;
}) =>
  createTweet({
    created_at,
    favorite_count,
    media: [],
    urls: ['random stuff'],
  });
