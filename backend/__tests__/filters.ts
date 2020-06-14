import { AccountType } from './../../__generated__/globalTypes';
import {
  createCommunitiesFilters,
  createTweetTypeFilters,
  createAccountTypeFilters,
} from './../filters';
import {
  createAccount,
  COMMUNITIES,
  createTweet,
  createCommunity,
  createTextTweet,
  createMediaTweet,
  createLinkTweet,
} from './../testUtils';
import { dayjsUtc } from './../../common/date';
import { createDateFilters, AccountTweet } from '../filters';

describe('filters', () => {
  it('creates dateFilters', () => {
    const DATE_NOW = dayjsUtc('2020-01-15');
    const DATE_BEFORE_ONE_WEEK = dayjsUtc('2020-01-08');

    const filters = createDateFilters({
      startDate: DATE_BEFORE_ONE_WEEK,
      endDate: DATE_NOW,
    });

    expect(filters).toHaveLength(8); // 7 days + 1 for the whole week

    const accountTweets: AccountTweet[] = [
      {
        account: createAccount(),
        tweets: [
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.toISOString() }),
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.add(1, 'day').toISOString() }),
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.add(2, 'day').toISOString() }),
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.add(8, 'day').toISOString() }),
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.subtract(1, 'day').toISOString() }),
        ],
      },
      {
        account: createAccount(),
        tweets: [
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.toISOString() }),
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.add(3, 'day').toISOString() }),
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.add(4, 'day').toISOString() }),
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.add(8, 'day').toISOString() }),
          createTweet({ created_at: DATE_BEFORE_ONE_WEEK.subtract(1, 'day').toISOString() }),
        ],
      },
    ];

    // ALL WEEK
    const allWeekFilter = filters[0];
    const accountTweetsAllWeek = allWeekFilter.filterAccountTweets(accountTweets);

    expect(allWeekFilter.fields).toEqual({
      period: 'WEEK',
      startDate: DATE_BEFORE_ONE_WEEK.toISOString(),
    });
    expect(accountTweetsAllWeek[0].tweets).toHaveLength(3);
    expect(accountTweetsAllWeek[1].tweets).toHaveLength(3);

    // DAY 1
    const day1Filter = filters[1];
    const accountTweetsDay1 = day1Filter.filterAccountTweets(accountTweets);

    expect(day1Filter.fields).toEqual({
      period: 'DAY',
      startDate: DATE_BEFORE_ONE_WEEK.toISOString(),
    });
    expect(accountTweetsDay1[0].tweets).toHaveLength(1);
    expect(accountTweetsDay1[1].tweets).toHaveLength(1);

    // DAY 2
    const day2Filter = filters[2];
    const accountTweetsDay2 = day2Filter.filterAccountTweets(accountTweets);

    expect(day2Filter.fields).toEqual({
      period: 'DAY',
      startDate: DATE_BEFORE_ONE_WEEK.add(1, 'day').toISOString(),
    });
    expect(accountTweetsDay2[0].tweets).toHaveLength(1);
    expect(accountTweetsDay2[1].tweets).toHaveLength(0);

    // DAY 3
    const day3Filter = filters[3];
    const accountTweetsDay3 = day3Filter.filterAccountTweets(accountTweets);

    expect(day3Filter.fields).toEqual({
      period: 'DAY',
      startDate: DATE_BEFORE_ONE_WEEK.add(2, 'day').toISOString(),
    });
    expect(accountTweetsDay3[0].tweets).toHaveLength(1);
    expect(accountTweetsDay3[1].tweets).toHaveLength(0);

    // DAY 4
    const day4Filter = filters[4];
    const accountTweetsDay4 = day4Filter.filterAccountTweets(accountTweets);

    expect(day4Filter.fields).toEqual({
      period: 'DAY',
      startDate: DATE_BEFORE_ONE_WEEK.add(3, 'day').toISOString(),
    });
    expect(accountTweetsDay4[0].tweets).toHaveLength(0);
    expect(accountTweetsDay4[1].tweets).toHaveLength(1);

    // DAY 5
    const day5Filter = filters[5];
    const accountTweetsDay5 = day5Filter.filterAccountTweets(accountTweets);

    expect(day5Filter.fields).toEqual({
      period: 'DAY',
      startDate: DATE_BEFORE_ONE_WEEK.add(4, 'day').toISOString(),
    });
    expect(accountTweetsDay5[0].tweets).toHaveLength(0);
    expect(accountTweetsDay5[1].tweets).toHaveLength(1);

    // DAY 6
    const day6Filter = filters[6];
    const accountTweetsDay6 = day6Filter.filterAccountTweets(accountTweets);

    expect(day6Filter.fields).toEqual({
      period: 'DAY',
      startDate: DATE_BEFORE_ONE_WEEK.add(5, 'day').toISOString(),
    });
    expect(accountTweetsDay6[0].tweets).toHaveLength(0);
    expect(accountTweetsDay6[1].tweets).toHaveLength(0);

    // DAY 7
    const day7Filter = filters[7];
    const accountTweetsDay7 = day7Filter.filterAccountTweets(accountTweets);

    expect(day7Filter.fields).toEqual({
      period: 'DAY',
      startDate: DATE_BEFORE_ONE_WEEK.add(6, 'day').toISOString(),
    });
    expect(accountTweetsDay7[0].tweets).toHaveLength(0);
    expect(accountTweetsDay7[1].tweets).toHaveLength(0);
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

    const businessFilter = accountTypeFilters[0];
    const accountTweetsBusiness = businessFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsBusiness).toHaveLength(2);
    expect(accountTweetsBusiness[0].tweets).toHaveLength(2);
    expect(accountTweetsBusiness[1].tweets).toHaveLength(2);

    const personalFilter = accountTypeFilters[1];
    const accountTweetsPersonal = personalFilter.filterAccountTweets(accountTweets);
    expect(accountTweetsPersonal).toHaveLength(1);
    expect(accountTweetsPersonal[0].tweets).toHaveLength(2);
  });
});
