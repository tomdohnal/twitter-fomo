import faker from 'faker';
import { AccountType } from '@prisma/client';
import { dayjsUtc } from '../common/date';
import { ApiTweet } from './twitter';
import { User } from 'twitter-d';

export { faker };

export const createCommunity = ({ id, name }: { id?: number; name?: string } = {}) => ({
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
  communities?: { id: number }[];
  id?: number;
  name?: string;
  twitterId?: string;
  type?: AccountType;
} = {}) => {
  return {
    id: id || faker.random.number(),
    name: name || faker.internet.userName(),
    twitterId: twitterId || faker.random.uuid(),
    type: type || AccountType.PERSONAL,
    communities: communities || [{ id: createCommunity().id }],
  };
};

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
  retweet_count: favorite_count || faker.random.number(),
  __accountId: faker.random.number(),
  full_text: faker.lorem.sentence(),
  id: faker.random.number(),
  id_str: String(faker.random.number()),
  user: ({
    name: faker.internet.userName(),
    profile_image_url_https: faker.internet.url(),
    screen_name: faker.internet.userName(),
  } as unknown) as User,
  favorited: faker.random.boolean(),
  retweeted: faker.random.boolean(),
  is_quote_status: faker.random.boolean(),
  source: faker.random.word(),
  truncated: faker.random.boolean(),
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
    media: [
      {
        id: 1296696105917456400,
        id_str: '1296696105917456386',
        indices: [156, 179],
        media_url: 'http://pbs.twimg.com/media/Ef7KPPbXoAIAAV2.jpg',
        media_url_https: 'https://pbs.twimg.com/media/Ef7KPPbXoAIAAV2.jpg',
        url: 'https://t.co/P6IgqbkRcU',
        display_url: 'pic.twitter.com/P6IgqbkRcU',
        expanded_url: 'https://twitter.com/mgechev/status/1296696108371116034/photo/1',
        type: 'photo',
        sizes: {
          thumb: { w: 150, h: 150, resize: 'crop' },
          medium: { w: 1200, h: 673, resize: 'fit' },
          large: { w: 2048, h: 1148, resize: 'fit' },
          small: { w: 680, h: 381, resize: 'fit' },
        },
      },
    ],
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
    urls: [
      {
        url: 'https://t.co/Zp804COUGM',
        expanded_url: 'https://www.taniarascia.com/understanding-destructuring-rest-spread/',
        display_url: 'taniarascia.com/understanding-…',
        indices: [65, 88],
      },
    ],
  });
