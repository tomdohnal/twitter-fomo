import Twitter from 'twitter-lite';
import * as R from 'ramda';
import { dayjsUtc, Dayjs } from '../common/date';
import logger from './logger';
import { Status } from 'twitter-d';

export type ApiTweet = Status & {
  __accountId: number;
};

// using `util.promisify` breaks Jest for some reason...
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getApp = () =>
  Promise.resolve(
    new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
    }),
  )
    .then((user) => user.getBearerToken())
    .then((response) => {
      return new Twitter({
        // @ts-ignore (bearer_token DOES exists in `TwitterOptions`)
        bearer_token: response.access_token,
      });
    });

async function pauseExecution(resetTimestamp: number) {
  const currentTimestamp = Date.now() / 1000;

  // + 5 is to allow for possible rounding errors / mistakes
  await sleep((resetTimestamp - currentTimestamp + 5) * 1000);
}

export async function fetchTweetsForAccount({
  accountId,
  twitterId,
  app,
  startDate,
}: {
  accountId: number;
  twitterId: string;
  app: Twitter;
  startDate: Dayjs;
}): Promise<ApiTweet[]> {
  let tweets: Status[] = [];
  let lastTweetDate = null;
  let loopCounter = 0;
  const MAX_LOOP_COUNTER = 50; // limit to prevent unexpected infinite loops

  // Fetch tweets from the timeline until the `startDate` is reached.
  // Pause execution if the 15-minut limit is reached.
  do {
    // eslint-disable-next-line no-plusplus
    loopCounter++;
    const lastTweet = tweets[tweets.length - 1];
    const lastTweetId = lastTweet && lastTweet.id;

    // eslint-disable-next-line no-await-in-loop
    const fetchTweets = (): Promise<Status[]> =>
      app
        .get('statuses/user_timeline', {
          user_id: twitterId,
          count: 200,
          include_rts: false,
          exclude_replies: true,
          tweet_mode: 'extended',
          ...(lastTweetId && { max_id: lastTweetId }),
        })
        .then(async (res: Status[] & { _headers: any }) => {
          const apiLimitRemaining = parseInt(
            // eslint-disable-next-line no-underscore-dangle
            res._headers.get('x-rate-limit-remaining'),
            10,
          );

          if (apiLimitRemaining === 0) {
            logger.log('`apiLimitRemaining === 0`, waiting...');
            const resetTimestamp = parseInt(
              // eslint-disable-next-line no-underscore-dangle
              res._headers.get('x-rate-limit-reset'),
              10,
            );

            await pauseExecution(resetTimestamp);
          }

          return res;
        })
        .catch(async (err) => {
          // handle limit exceeded
          if (err.errors && err.errors[0].code === 88) {
            logger.error(new Error('Twitter limit exceeded, waiting...'));
            await sleep(60000); // sleep for 1 minute
            return fetchTweets();
          }

          // the account only allows authorized users to view the tweets
          if (err.error === 'Not authorized.') {
            return [];
          }

          throw err;
        });

    // eslint-disable-next-line no-await-in-loop
    const fetchedTweets = await fetchTweets();

    lastTweetDate = fetchedTweets.length
      ? dayjsUtc(fetchedTweets[fetchedTweets.length - 1].created_at)
      : dayjsUtc().add(1, 'year');

    tweets = tweets.concat(fetchedTweets);
  } while (lastTweetDate.isAfter(startDate) && loopCounter < MAX_LOOP_COUNTER);

  if (loopCounter > MAX_LOOP_COUNTER) {
    logger.error(new Error('`loopCounter >= MAX_LOOP_COUNTER`'));
  }

  // TODO: possible perf boost - the tweets are sorted
  // by date so you can leverage that when filtering.
  // But premature optimization for now IMHO
  return tweets
    .filter((tweet) => {
      const tweetDate = dayjsUtc(tweet.created_at);

      return tweetDate.isAfter(startDate) || tweetDate.isSame(startDate);
    })
    .map(R.assoc('__accountId', accountId));
}
