import * as R from 'ramda';
import {
  createTweetTypeFilters,
  createCommunitiesFilters,
  AccountTweet,
  createDateFilters,
} from '../../filters';
import {
  createTweet,
  createCommunity,
  createAccount,
  createTextTweet,
  createLinkTweet,
  createMediaTweet,
} from '../../testUtils';
import { dayjsUtc } from '../../../common/date';
import { createListsData } from '../parseTweets';

describe('parseTweets', () => {
  describe('createListInputs', () => {
    it('works with NO filters', () => {
      const sortedAccountTweets: AccountTweet[] = [
        {
          account: createAccount(),
          tweets: [
            createTweet({ created_at: '2020-01-01' }),
            createTweet({ created_at: '2020-01-01' }),
            createTweet({ created_at: '2020-01-01' }),
          ],
        },
      ];

      const listObjects = createListsData({
        sortedAccountTweets,
        appliedFilters: [],
        remainingFilters: [],
      });

      expect(listObjects).toHaveLength(1);
      expect(listObjects).toMatchSnapshot();
    });

    it('works with DATE filters', async () => {
      // 2020-01-01
      const tweet1 = createTweet({ created_at: '2020-01-01' });
      const tweet2 = createTweet({ created_at: '2020-01-01' });
      const tweet3 = createTweet({ created_at: '2020-01-01' });
      const tweet4 = createTweet({ created_at: '2020-01-01' });

      // 2020-01-02
      const tweet5 = createTweet({ created_at: '2020-01-02' });
      const tweet6 = createTweet({ created_at: '2020-01-02' });

      const sortedAccountTweets: AccountTweet[] = [
        {
          account: createAccount(),
          tweets: [tweet1, tweet2, tweet5],
        },
        {
          account: createAccount(),
          tweets: [tweet3, tweet4, tweet6],
        },
      ];

      const dateFilters = createDateFilters(dayjsUtc('2020-01-01').add(1, 'day'));

      const listObjects = createListsData({
        sortedAccountTweets,
        appliedFilters: [],
        remainingFilters: [dateFilters],
      });

      expect(listObjects).toHaveLength(3); // 1 without filters + 2 for each filter (1 day filter + 1 week filter)
      expect(listObjects).toMatchSnapshot();
    });

    it('works with DATE and COMMUNITIES and TWEET_TYPE filters', () => {
      const COMMUNITIES = [createCommunity(), createCommunity()];
      const account1 = createAccount({
        communities: [COMMUNITIES[0]],
      });

      const account2 = createAccount({
        communities: [COMMUNITIES[1]],
      });

      // 2020-01-01
      const tweet1 = createTweet({ created_at: '2020-01-01' });
      const tweet2 = createTextTweet({ created_at: '2020-01-01' });
      const tweet3 = createLinkTweet({ created_at: '2020-01-01' });
      const tweet4 = createMediaTweet({ created_at: '2020-01-01' });

      // 2020-01-02
      const tweet5 = createTweet({ created_at: '2020-01-02' });
      const tweet6 = createTweet({ created_at: '2020-01-02' });

      const sortedAccountTweets: AccountTweet[] = [
        {
          account: account1,
          tweets: [tweet1, tweet2, tweet5],
        },
        {
          account: account2,
          tweets: [tweet3, tweet4, tweet6],
        },
      ];

      // yields 2 filters - 1 DAY filters and 1 WEEK filter
      const dateFilters = createDateFilters(dayjsUtc('2020-01-01').add(1, 'day'));

      // yields 2 filters
      const communitiesFilters = createCommunitiesFilters(COMMUNITIES);

      // yields 3 filters (TEXT, LINK and MEDIA)
      const tweetTypeFilters = createTweetTypeFilters();

      const listObjects = createListsData({
        sortedAccountTweets,
        appliedFilters: [],
        remainingFilters: [dateFilters, communitiesFilters, tweetTypeFilters],
      });

      expect(listObjects).toHaveLength(36); // draw a tree... (it's hard for me as well, don't worry, LOL :D)
      expect(listObjects.map(R.omit(['tweets']))).toMatchSnapshot();
    });
  });
});
