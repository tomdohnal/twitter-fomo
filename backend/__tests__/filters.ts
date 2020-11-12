import { AccountType } from '@prisma/client';
import {
  createCommunitiesFilters,
  createTweetTypeFilters,
  createAccountTypeFilters,
  createDateFilters,
  AccountTweet,
} from '../filters';
import {
  createAccount,
  createTweet,
  createCommunity,
  createTextTweet,
  createMediaTweet,
  createLinkTweet,
} from '../testUtils';
import { dayjsUtc } from '../../common/date';

describe('filters', () => {
  it('creates dateFilters', () => {
    const DATE_NOW = dayjsUtc('2020-01-15');

    const filters = createDateFilters(DATE_NOW);

    expect(filters).toHaveLength(2); // WEEK filter + DAY filter

    const accountTweets: AccountTweet[] = [
      {
        account: createAccount(),
        tweets: [
          createTweet({ created_at: DATE_NOW.toISOString() }),
          createTweet({ created_at: DATE_NOW.subtract(1, 'day').toISOString() }),
          createTweet({ created_at: DATE_NOW.subtract(7, 'day').toISOString() }),
          createTweet({ created_at: DATE_NOW.subtract(8, 'day').toISOString() }),
        ],
      },
      {
        account: createAccount(),
        tweets: [
          createTweet({ created_at: DATE_NOW.toISOString() }),
          createTweet({ created_at: DATE_NOW.subtract(12, 'hour').toISOString() }),
          createTweet({ created_at: DATE_NOW.subtract(4, 'day').toISOString() }),
          createTweet({ created_at: DATE_NOW.subtract(8, 'day').toISOString() }),
        ],
      },
    ];

    // WEEK FILTER
    const weekFilter = filters[0];
    const accountTweetsWeek = weekFilter.filterAccountTweets(accountTweets);

    expect(accountTweetsWeek[0].tweets).toHaveLength(3);
    expect(accountTweetsWeek[1].tweets).toHaveLength(3);

    // DAY FILTER
    const dayFilter = filters[1];
    const accountTweetsDay = dayFilter.filterAccountTweets(accountTweets);

    expect(accountTweetsDay[0].tweets).toHaveLength(2);
    expect(accountTweetsDay[1].tweets).toHaveLength(2);
  });

  it('creates communityFilters', () => {
    const REACT_COMMUNITY = createCommunity({ name: 'React' });
    const VUE_COMMUNITY = createCommunity({ name: 'Vue' });
    const ANGULAR_COMMUNITY = createCommunity({ name: 'Angular' });

    const accountTweets: AccountTweet[] = [
      {
        account: createAccount({
          communities: [REACT_COMMUNITY, VUE_COMMUNITY],
        }),
        tweets: [createTweet(), createTweet(), createTweet()],
      },
      {
        account: createAccount({ communities: [REACT_COMMUNITY] }),
        tweets: [createTweet(), createTweet(), createTweet()],
      },
      {
        account: createAccount({ communities: [VUE_COMMUNITY] }),
        tweets: [createTweet(), createTweet(), createTweet()],
      },
      {
        account: createAccount({ communities: [] }),
        tweets: [createTweet(), createTweet(), createTweet()],
      },
    ];

    const communitiesFilters = createCommunitiesFilters([
      REACT_COMMUNITY,
      VUE_COMMUNITY,
      ANGULAR_COMMUNITY,
    ]);

    expect(communitiesFilters).toHaveLength(3);

    // REACT COMMUNITY
    const reactFilter = communitiesFilters[0];
    const accountTweetsReact = reactFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsReact).toHaveLength(2);
    // tweets should be intact
    expect(accountTweetsReact[0].tweets).toHaveLength(3);
    expect(accountTweetsReact[1].tweets).toHaveLength(3);

    // VUE COMMUNITY
    const vueFilter = communitiesFilters[1];
    const accountTweetsVue = vueFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsVue).toHaveLength(2);
    // tweets should be intact
    expect(accountTweetsVue[0].tweets).toHaveLength(3);
    expect(accountTweetsVue[1].tweets).toHaveLength(3);

    // ANGULAR COMMUNITY
    const angularFilter = communitiesFilters[2];
    const accountTweetsAngular = angularFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsAngular).toHaveLength(0);
  });

  it('creates tweetType filters', () => {
    const accountTweets: AccountTweet[] = [
      {
        account: createAccount(),
        tweets: [createTextTweet(), createTextTweet(), createTextTweet()],
      },
      {
        account: createAccount(),
        tweets: [createMediaTweet(), createMediaTweet(), createLinkTweet()],
      },
    ];

    const tweetTypeFilters = createTweetTypeFilters();

    const linkFilter = tweetTypeFilters[0];
    const accountTweetsLink = linkFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsLink).toHaveLength(2);
    expect(accountTweetsLink[0].tweets).toHaveLength(0);
    expect(accountTweetsLink[1].tweets).toHaveLength(1);

    const mediaFilter = tweetTypeFilters[1];
    const accountTweetsMedia = mediaFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsMedia).toHaveLength(2);
    expect(accountTweetsMedia[0].tweets).toHaveLength(0);
    expect(accountTweetsMedia[1].tweets).toHaveLength(2);

    const textFilter = tweetTypeFilters[2];
    const accountTweetsText = textFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsText).toHaveLength(2);
    expect(accountTweetsText[0].tweets).toHaveLength(3);
    expect(accountTweetsText[1].tweets).toHaveLength(0);
  });

  it('creates accountType filters', () => {
    const accountTypeFilters = createAccountTypeFilters();

    const accountTweets: AccountTweet[] = [
      {
        account: createAccount({ type: AccountType.BUSINESS }),
        tweets: [createTextTweet(), createTextTweet()],
      },
      {
        account: createAccount({ type: AccountType.BUSINESS }),
        tweets: [createTextTweet(), createTextTweet()],
      },
      {
        account: createAccount({ type: AccountType.PERSONAL }),
        tweets: [createMediaTweet(), createMediaTweet()],
      },
    ];

    const personalFilter = accountTypeFilters[0];
    const accountTweetsPersonal = personalFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsPersonal).toHaveLength(1);
    expect(accountTweetsPersonal[0].tweets).toHaveLength(2);

    const businessFilter = accountTypeFilters[1];
    const accountTweetsBusiness = businessFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsBusiness).toHaveLength(2);
    expect(accountTweetsBusiness[0].tweets).toHaveLength(2);
    expect(accountTweetsBusiness[1].tweets).toHaveLength(2);
  });
});
