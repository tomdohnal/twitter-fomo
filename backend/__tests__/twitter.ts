import { advanceBy, advanceTo, clear } from 'jest-date-mock';
import { createTweet } from './../testUtils';
import Twitter from 'twitter-lite';
import * as R from 'ramda';
import { dayjsUtc, Dayjs } from './../../common/date';
import { fetchTweetsForAccount, promiseTest } from '../twitter';
import faker from 'faker';

jest.useFakeTimers();

// this makes generated fake data consistent across multiple test runs
faker.seed(0);

const DATE_NOW = dayjsUtc('2020-01-15');
const DATE_BEFORE_ONE_WEEK = DATE_NOW.subtract(1, 'week');

const createMockApiTweets = ({ count, createdAt }: { count: number; createdAt: Dayjs }) =>
  R.range(0, count).map(() =>
    R.omit(['__accountId'], createTweet({ created_at: createdAt.toISOString() })),
  );

const accountId = faker.random.uuid();
const twitterId = String(faker.random.number());
const app = new Twitter({ consumer_key: 'fake_key', consumer_secret: 'fake_secret' });

describe('twitter', () => {
  beforeEach(() => {
    clear();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('parses response', async () => {
    const MOCK_RES_1: any = [
      ...createMockApiTweets({ count: 100, createdAt: DATE_NOW.add(1, 'day') }),
      ...createMockApiTweets({ count: 100, createdAt: DATE_NOW }),
    ];
    MOCK_RES_1._headers = {};
    MOCK_RES_1._headers.get = (headerName: string) => {
      if (headerName === 'x-rate-limit-remaining') {
        return 1499;
      }
    };

    const MOCK_RES_2: any = createMockApiTweets({
      count: 200,
      createdAt: DATE_NOW.subtract(3, 'day'),
    });
    MOCK_RES_2._headers = {};
    MOCK_RES_2._headers.get = (headerName: string) => {
      if (headerName === 'x-rate-limit-remaining') {
        return 1498;
      }
    };

    const MOCK_RES_3: any = [
      ...createMockApiTweets({ count: 100, createdAt: DATE_NOW.subtract(5, 'day') }),
      ...createMockApiTweets({ count: 100, createdAt: DATE_NOW.subtract(8, 'day') }),
    ];
    MOCK_RES_3._headers = {};
    MOCK_RES_3._headers.get = (headerName: string) => {
      if (headerName === 'x-rate-limit-remaining') {
        return 1498;
      }
    };
    let callCounter = 0;

    const MOCK_RESPONSES = [MOCK_RES_1, MOCK_RES_2, MOCK_RES_3];

    // @ts-ignore
    app.get = jest.fn(() => {
      const res = MOCK_RESPONSES[callCounter];
      callCounter++;
      return Promise.resolve(res);
    });

    // create a lot of tweets so that multiple iteration are needed
    const apiTweets = await fetchTweetsForAccount({
      startDate: DATE_BEFORE_ONE_WEEK,
      endDate: DATE_NOW,
      accountId,
      twitterId,
      app,
    });

    expect(app.get).toHaveBeenCalledTimes(3);
    expect(apiTweets).toHaveLength(400); // the last 100 should be discarded
    apiTweets.forEach(t => {
      expect(t.__accountId).toBe(accountId);
    });
  });

  it('waits when limit would be exceeded', async () => {
    const TIMESTAMP_NOW = 0;

    const MOCK_RES_1: any = createMockApiTweets({
      count: 10,
      createdAt: DATE_NOW.subtract(1, 'day'),
    });
    MOCK_RES_1._headers = {};
    MOCK_RES_1._headers.get = (headerName: string) => {
      if (headerName === 'x-rate-limit-remaining') {
        return 0;
      }

      if (headerName === 'x-rate-limit-reset') {
        return TIMESTAMP_NOW + 10;
      }
    };

    const MOCK_RES_2: any = createMockApiTweets({
      count: 10,
      createdAt: DATE_NOW.subtract(8, 'day'),
    });
    MOCK_RES_2._headers = {};
    MOCK_RES_2._headers.get = (headerName: string) => {
      if (headerName === 'x-rate-limit-remaining') {
        return 1499;
      }
    };

    advanceTo(TIMESTAMP_NOW);
    let callCounter = 0;

    const MOCK_RESPONSES = [MOCK_RES_1, MOCK_RES_2];

    // @ts-ignore
    app.get = jest.fn(() => {
      const res = MOCK_RESPONSES[callCounter];
      callCounter++;
      return Promise.resolve(res);
    });

    // create a lot of tweets so that multiple iteration are needed
    const promise = fetchTweetsForAccount({
      startDate: DATE_BEFORE_ONE_WEEK,
      endDate: DATE_NOW,
      accountId,
      twitterId,
      app,
    });

    // we need the promise in `fetchTweetsForAccount` to execute before
    // running the time
    await Promise.resolve();

    jest.runAllTimers();

    const apiTweets = await promise;

    expect(app.get).toHaveBeenCalledTimes(2);
    expect(apiTweets).toHaveLength(10);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 15000);
  });

  it('handles limit exceeded error', async () => {
    const MOCK_RES_ERROR: any = {
      errors: [{ code: 88 }],
    };

    const MOCK_RES_SUCCESS: any = [
      ...createMockApiTweets({
        count: 10,
        createdAt: DATE_NOW.subtract(3, 'day'),
      }),
      ...createMockApiTweets({
        count: 10,
        createdAt: DATE_NOW.subtract(8, 'day'),
      }),
    ];
    MOCK_RES_SUCCESS._headers = {};
    MOCK_RES_SUCCESS._headers.get = (headerName: string) => {
      if (headerName === 'x-rate-limit-remaining') {
        return 1499;
      }
    };

    let callCounter = 0;

    // @ts-ignore
    app.get = jest.fn(() => {
      if (callCounter === 0) {
        callCounter++;
        return Promise.reject(MOCK_RES_ERROR);
      }

      return Promise.resolve(MOCK_RES_SUCCESS);
    });

    // create a lot of tweets so that multiple iteration are needed
    const promise = fetchTweetsForAccount({
      startDate: DATE_BEFORE_ONE_WEEK,
      endDate: DATE_NOW,
      accountId,
      twitterId,
      app,
    });

    // we need the promise in `fetchTweetsForAccount` to execute before
    // running the time
    await Promise.resolve();
    await Promise.resolve();

    jest.runAllTimers();

    const apiTweets = await promise;

    expect(app.get).toHaveBeenCalledTimes(2);
    expect(apiTweets).toHaveLength(10);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 60000);
  });

  it('throws for unexpected twitter api error', async () => {
    const MOCK_RES_ERROR: any = {
      errors: [{ code: 55 }],
    };

    // @ts-ignore
    app.get = jest.fn(() => {
      return Promise.reject(MOCK_RES_ERROR);
    });

    let error;
    try {
      await fetchTweetsForAccount({
        startDate: DATE_BEFORE_ONE_WEEK,
        endDate: DATE_NOW,
        accountId,
        twitterId,
        app,
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBeTruthy();
    expect(app.get).toHaveBeenCalledTimes(1);
    expect(setTimeout).not.toHaveBeenCalled();
  });

  it('does NOT allow more than 50 iterations', async () => {
    const MOCK_RESPONSES = R.range(0, 100).map(() => {
      const res: any = createMockApiTweets({ count: 1, createdAt: DATE_NOW.subtract(1, 'day') });

      res._headers = {};
      res._headers.get = (headerName: string) => {
        if (headerName === 'x-rate-limit-remaining') {
          return 1499;
        }
      };

      return res;
    });

    let callCounter = 0;

    // @ts-ignore
    app.get = jest.fn(() => {
      const res = MOCK_RESPONSES[callCounter];
      callCounter++;
      return Promise.resolve(res);
    });

    // create a lot of tweets so that multiple iteration are needed
    const apiTweets = await fetchTweetsForAccount({
      startDate: DATE_BEFORE_ONE_WEEK,
      endDate: DATE_NOW,
      accountId,
      twitterId,
      app,
    });

    expect(app.get).toHaveBeenCalledTimes(50);
    expect(apiTweets).toHaveLength(50);
  });
});
