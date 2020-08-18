import faker from 'faker';
import { dayjsUtc } from '../common/date';
import { ApiTweet } from './twitter';
import { AccountType } from './__generated__/graphql';

export { faker };

export const createCommunity = ({
  id,
  name,
}: { id?: number; name?: string } = {}) => ({
  id: id || faker.random.number(),
  name: name || faker.internet.domainName(),
});

export const createAccount = ({
  communities,
  id,
  name,
  twitterId,
  type,
}: {
  communities?: {id: number}[];
  id?: number;
  name?: string;
  twitterId?: string;
  type?: AccountType;
} = {}) => {
  return {
    id: id || faker.random.number(),
    name: name || faker.internet.userName(),
    twitterId: twitterId || faker.random.uuid(),
    type: type || AccountType.Personal,
    communities: communities || [{ id: createCommunity().id }],
  };
};

export const COMMUNITIES = [
  {
    id: 1,
    name: 'React',
  },
  {
    id: 2,
    name: 'Vue',
  },
];

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
  __accountId: faker.random.number(),
  full_text: faker.lorem.sentence(),
  id: faker.random.number(),
  id_str: String(faker.random.number()),
  user: {
    name: faker.internet.userName(),
  },
});

export const createTextTweet = ({
  created_at,
  favorite_count,
}: {
  created_at?: string;
  favorite_count?: number;
} = {}) => createTweet({ created_at, favorite_count, media: [], urls: [] });

export const createMediaTweet = ({
  created_at,
  favorite_count,
}: {
  created_at?: string;
  favorite_count?: number;
} = {}) =>
  createTweet({
    created_at,
    favorite_count,
    media: ['random stuff'],
    urls: [],
  });

export const createLinkTweet = ({
  created_at,
  favorite_count,
}: {
  created_at?: string;
  favorite_count?: number;
} = {}) =>
  createTweet({
    created_at,
    favorite_count,
    media: [],
    urls: ['random stuff'],
  });
