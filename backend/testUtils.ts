import faker from 'faker';
import { dayjsUtc } from '../common/date';
import { ApiTweet } from './twitter';
import { AccountType, CommunityBasicFragment, AccountBasicFragment } from './__generated__/graphql';

export { faker };

export const createCommunity = ({
  _id,
  name,
}: { _id?: string; name?: string } = {}): CommunityBasicFragment => ({
  _id: _id || faker.random.uuid(),
  name: name || faker.internet.domainName(),
});

export const createAccount = ({
  communities,
  _id,
  name,
  twitterId,
  type,
}: {
  communities?: CommunityBasicFragment[];
  _id?: string;
  name?: string;
  twitterId?: string;
  type?: AccountType;
} = {}): AccountBasicFragment => {
  return {
    _id: _id || faker.random.uuid(),
    name: name || faker.internet.userName(),
    twitterId: twitterId || faker.random.uuid(),
    type: type || AccountType.Personal,
    communities: {
      data: communities || [createCommunity()],
    },
  };
};

export const COMMUNITIES: CommunityBasicFragment[] = [
  {
    _id: '1',
    name: 'React',
  },
  {
    _id: '2',
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
  __accountId: faker.random.uuid(),
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
