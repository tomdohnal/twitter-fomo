import * as R from 'ramda';
import fetch from 'cross-fetch';
import { TweetCreateInput } from '@prisma/client';
import {
  createTweetTypeFilters,
  createAccountTypeFilters,
  Filter,
  AccountTweet,
  createCommunitiesFilters,
  createDateFilters,
  getTweetTypes,
} from '../filters';
import { ApiTweet, getApp, fetchTweetsForAccount } from '../twitter';
import { dayjsUtc, DAY_BEFORE_ONE_WEEK, DAY_NOW } from '../../common/date';
import { fetchCommunities, fetchAccounts, createTweetList, prisma } from '../db';
import logger from '../logger';

function getTopTweets(tweets: Array<ApiTweet>) {
  const sortedTweets = R.sort((a, b) => b.favorite_count - a.favorite_count, tweets);

  return sortedTweets.slice(0, 10);
}

function getSortedTweets(tweets: Array<ApiTweet>) {
  return R.sort((a, b) => b.favorite_count - a.favorite_count, tweets);
}

const createListData = ({
  tweets,
}: {
  tweets: ApiTweet[];
  appliedFilters: Filter[];
}): TweetCreateInput[] => {
  // parse hashtags
  return tweets.map(tweet => ({
    twitterId: tweet.id_str,
    publishedAt: dayjsUtc(tweet.created_at).toISOString(),
    text: tweet.full_text,
    accountName: tweet.user.name,
    account: { connect: { id: tweet.__accountId } },
    favoritesCount: tweet.favorite_count,
    retweetsCount: tweet.retweet_count,
    accountProfileImageUrl: tweet.user.profile_image_url_https,
    accountScreenName: tweet.user.screen_name,
    urls: {
      create: tweet.entities.urls?.map(urlEntity => ({
        indices: {
          set: urlEntity.indices,
        },
        displayUrl: urlEntity.display_url,
        expandedUrl: urlEntity.expanded_url,
        url: urlEntity.url,
      })),
    },
    media: {
      create: tweet.entities.media?.map(mediaEntity => ({
        displayUrl: mediaEntity.display_url,
        expandedUrl: mediaEntity.expanded_url,
        mediaUrl: mediaEntity.media_url,
        mediaUrlHttps: mediaEntity.media_url_https,
        type: mediaEntity.type,
        url: mediaEntity.url,
        indices: { set: mediaEntity.indices },
      })),
    },
    tweetTypes: { set: getTweetTypes(tweet) },
  }));
};

export function createListsData({
  sortedAccountTweets,
  appliedFilters,
  remainingFilters,
}: {
  sortedAccountTweets: AccountTweet[];
  appliedFilters: Array<Filter>;
  remainingFilters: Array<Array<Filter>>;
}): TweetCreateInput[][] {
  const topTweets = getTopTweets(sortedAccountTweets.flatMap(R.prop('tweets')));

  const listInput = createListData({
    tweets: topTweets,
    appliedFilters,
  });

  const childLists = remainingFilters.flatMap((filters, filtersIndex) =>
    filters.flatMap(filter => {
      const filteredSortedAccountTweets = filter.filterAccountTweets(sortedAccountTweets);

      const newAppliedFilters = [...appliedFilters, filter];
      const newRemainingFilters = remainingFilters.slice(filtersIndex + 1);

      return createListsData({
        sortedAccountTweets: filteredSortedAccountTweets,
        appliedFilters: newAppliedFilters,
        remainingFilters: newRemainingFilters,
      });
    }),
  );

  return [listInput, ...childLists];
}

export async function run() {
  const twitterApp = await getApp();

  const accounts = await fetchAccounts();

  const sortedAccountTweets: AccountTweet[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const account of accounts) {
    logger.log(`Fetching tweets for ${account.name} (${account.twitterId})`);
    // eslint-disable-next-line no-await-in-loop
    await fetchTweetsForAccount({
      accountId: account.id,
      twitterId: account.twitterId,
      app: twitterApp,
      startDate: DAY_BEFORE_ONE_WEEK,
    })
      .then(tweets => {
        logger.log(`Success: Fetched tweets for ${account.name} (${account.twitterId})`);

        sortedAccountTweets.push({ account, tweets: getSortedTweets(tweets) });
      })
      .catch(() => {
        logger.error(
          new Error(`Error: failed to fetched tweet for ${account.name} (${account.twitterId})`),
        );
      });
  }

  const communities = await fetchCommunities();

  const dateFilters = createDateFilters(DAY_NOW);
  const communitiesFilters = createCommunitiesFilters(communities);
  const tweetTypeFilters = createTweetTypeFilters();
  const accountTypeFilters = createAccountTypeFilters();

  // we treat `dateFilters` as an exception now as they always must be present...
  logger.log('Created list inputs');
  const tweetLists = dateFilters.flatMap(dateFilter => {
    const filteredSortedAccountTweets = dateFilter.filterAccountTweets(sortedAccountTweets);

    return createListsData({
      sortedAccountTweets: filteredSortedAccountTweets,
      appliedFilters: [dateFilter],
      remainingFilters: [tweetTypeFilters, communitiesFilters, accountTypeFilters],
    });
  });
  logger.log('Success: list inputs created');

  // eslint-disable-next-line no-restricted-syntax
  for (const tweetList of tweetLists) {
    logger.log('Uploading tweet list', { tweetList });
    // eslint-disable-next-line no-await-in-loop
    await createTweetList(tweetList)
      .then(() => {
        logger.log('Success: list input');
      })
      .catch(err => {
        logger.error(err);
      });
  }

  await prisma.$disconnect();

  await fetch(`https://api.vercel.com/v1/integrations/deploy/${process.env.DEPLOY_HOOK_KEY}`, {
    method: 'POST',
  });
}
