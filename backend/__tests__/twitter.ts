import { advanceTo, clear } from 'jest-date-mock';
import Twitter from 'twitter-lite';
import * as R from 'ramda';
import { createTweet, faker } from '../testUtils';
import { dayjsUtc, Dayjs } from '../../common/date';
import { fetchTweetsForAccount } from '../twitter';
import { Status } from 'twitter-d';

type TwitterResponse = Status[] & { _headers: Pick<Headers, 'get'> };

jest.useFakeTimers();

const DATE_NOW = dayjsUtc('2020-01-15');
const DATE_BEFORE_ONE_WEEK = DATE_NOW.subtract(1, 'week');

const createApiTweets = ({ count, createdAt }: { count: number; createdAt: Dayjs }): Status[] =>
  R.range(0, count).map(() =>
    R.omit(['__accountId'], createTweet({ created_at: createdAt.toISOString() })),
  );

const accountId = faker.random.number();
const twitterId = String(faker.random.number());
const app = new Twitter({ consumer_key: 'fake_key', consumer_secret: 'fake_secret' });

describe('twitter', () => {
  beforeEach(() => {
    clear();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('parses response', async () => {
    const TWITTER_RES_1: TwitterResponse = [
      // 100 tweets created an hour ago
      ...createApiTweets({ count: 100, createdAt: DATE_NOW.add(1, 'day') }),
      // 100 tweets created now
      ...createApiTweets({ count: 100, createdAt: DATE_NOW }),
    ] as TwitterResponse;
    TWITTER_RES_1._headers = {
      get(headerName: string) {
        if (headerName === 'x-rate-limit-remaining') {
          return '1499';
        }

        return null;
      },
    };

    const TWITTER_RES_2: TwitterResponse = [
      // 100 tweets created three days ago
      ...createApiTweets({
        count: 200,
        createdAt: DATE_NOW.subtract(3, 'day'),
      }),
    ] as TwitterResponse;
    TWITTER_RES_2._headers = {
      get(headerName: string) {
        if (headerName === 'x-rate-limit-remaining') {
          return '1498';
        }

        return null;
      },
    };

    const TWITTER_RES_3: TwitterResponse = [
      ...createApiTweets({ count: 100, createdAt: DATE_NOW.subtract(7, 'day') }),
      ...createApiTweets({ count: 100, createdAt: DATE_NOW.subtract(8, 'day') }),
    ] as TwitterResponse;
    TWITTER_RES_3._headers = {
      get(headerName: string) {
        if (headerName === 'x-rate-limit-remaining') {
          return '1498';
        }

        return null;
      },
    };

    const TWITTER_RESPONSES = [TWITTER_RES_1, TWITTER_RES_2, TWITTER_RES_3];
    let callCounter = 0;

    app.get = jest.fn(() => {
      const res = TWITTER_RESPONSES[callCounter];
      callCounter++;
      return Promise.resolve(res);
    }) as any;

    // create a lot of tweets so that multiple iteration are needed
    const apiTweets = await fetchTweetsForAccount({
      startDate: DATE_BEFORE_ONE_WEEK,
      accountId,
      twitterId,
      app,
    });

    expect(app.get).toHaveBeenCalledTimes(3);
    expect(apiTweets).toHaveLength(500); // the last 100 should be discarded
    apiTweets.forEach((t) => {
      expect(t.__accountId).toBe(accountId);
    });
  });

  it('waits when limit would be exceeded', async () => {
    const TIMESTAMP_NOW = 0;

    const TWITTER_RES_1: TwitterResponse = createApiTweets({
      count: 10,
      createdAt: DATE_NOW.subtract(1, 'day'),
    }) as TwitterResponse;
    TWITTER_RES_1._headers = {
      get(headerName: string) {
        // limit is exceeded after this request
        if (headerName === 'x-rate-limit-remaining') {
          return '0';
        }

        if (headerName === 'x-rate-limit-reset') {
          return String(TIMESTAMP_NOW + 10);
        }

        return null;
      },
    };

    const TWITTER_RES_2: TwitterResponse = createApiTweets({
      count: 10,
      createdAt: DATE_NOW.subtract(8, 'day'),
    }) as TwitterResponse;
    TWITTER_RES_2._headers = {
      get(headerName: string) {
        if (headerName === 'x-rate-limit-remaining') {
          return '1499';
        }

        return null;
      },
    };

    advanceTo(TIMESTAMP_NOW);

    let callCounter = 0;
    const MOCK_RESPONSES = [TWITTER_RES_1, TWITTER_RES_2];

    app.get = jest.fn(() => {
      const res = MOCK_RESPONSES[callCounter];
      callCounter++;
      return Promise.resolve(res);
    }) as any;

    // create a lot of tweets so that multiple iteration are needed
    const promise = fetchTweetsForAccount({
      startDate: DATE_BEFORE_ONE_WEEK,
      accountId,
      twitterId,
      app,
    });

    // we need the promise in `fetchTweetsForAccount` to execute before
    // running the timer
    await Promise.resolve();

    jest.runAllTimers();

    const apiTweets = await promise;

    expect(app.get).toHaveBeenCalledTimes(2);
    expect(apiTweets).toHaveLength(10);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 15000);
  });

  it('handles limit exceeded error', async () => {
    const TWITTER_RES_ERROR = {
      errors: [{ code: 88 }], // 88 is the error code for Rate limit exceeded.
    };

    const TWITTER_RES_SUCCESS: TwitterResponse = [
      ...createApiTweets({
        count: 10,
        createdAt: DATE_NOW.subtract(3, 'day'),
      }),
      ...createApiTweets({
        count: 10,
        createdAt: DATE_NOW.subtract(8, 'day'),
      }),
    ] as TwitterResponse;
    TWITTER_RES_SUCCESS._headers = {
      get(headerName: string) {
        if (headerName === 'x-rate-limit-remaining') {
          return '1499';
        }

        return null;
      },
    };

    let callCounter = 0;

    // Return an error on the first call and a success on the second call.
    app.get = jest.fn(() => {
      if (callCounter === 0) {
        callCounter++;
        return Promise.reject(TWITTER_RES_ERROR);
      }

      return Promise.resolve(TWITTER_RES_SUCCESS);
    }) as any;

    // create a lot of tweets so that multiple iteration are needed
    const promise = fetchTweetsForAccount({
      startDate: DATE_BEFORE_ONE_WEEK,
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
    const TWITTER_RES_ERROR = {
      errors: [{ code: 55 }], // An arbitrary error code. NOT the one for Rate limit exceeded
    };

    app.get = jest.fn(() => {
      return Promise.reject(TWITTER_RES_ERROR);
    });

    let error;
    try {
      await fetchTweetsForAccount({
        startDate: DATE_BEFORE_ONE_WEEK,
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
    // Create one hundred tweet responses.
    const TWITTER_RESPONSES = R.range(0, 100).map(() => {
      const res: any = createApiTweets({ count: 1, createdAt: DATE_NOW.subtract(1, 'day') });

      res._headers = {};
      res._headers.get = (headerName: string) => {
        if (headerName === 'x-rate-limit-remaining') {
          return 1499;
        }
      };

      return res;
    });

    let callCounter = 0;

    app.get = jest.fn(() => {
      const res = TWITTER_RESPONSES[callCounter];
      callCounter++;
      return Promise.resolve(res);
    });

    // Create a lot of tweets so that more than 50 iterations are needed.
    // It should stop after 50 as it signifies that something went wrong.
    const apiTweets = await fetchTweetsForAccount({
      startDate: DATE_BEFORE_ONE_WEEK,
      accountId,
      twitterId,
      app,
    });

    expect(app.get).toHaveBeenCalledTimes(50);
    expect(apiTweets).toHaveLength(50);
  });
});
