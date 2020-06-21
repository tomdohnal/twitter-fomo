/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Period, TweetType, AccountType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: RecentList
// ====================================================

export interface RecentList_recentList_community {
  readonly name: string;
}

export interface RecentList_recentList_tweets_data {
  /**
   * The document's ID.
   */
  readonly _id: string;
  readonly accountName: string;
  readonly favoritesCount: number;
  readonly text: string;
}

export interface RecentList_recentList_tweets {
  /**
   * The elements of type 'Tweet' in this page.
   */
  readonly data: ReadonlyArray<(RecentList_recentList_tweets_data | null)>;
}

export interface RecentList_recentList {
  readonly tweetType: TweetType | null;
  readonly accountType: AccountType | null;
  readonly period: Period;
  readonly community: RecentList_recentList_community | null;
  readonly tweets: RecentList_recentList_tweets;
}

export interface RecentList {
  readonly recentList: RecentList_recentList | null;
}

export interface RecentListVariables {
  readonly period: Period;
  readonly communityId?: string | null;
  readonly tweetType?: TweetType | null;
  readonly accountType?: AccountType | null;
}
