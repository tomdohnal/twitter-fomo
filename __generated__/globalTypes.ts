/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AccountType {
  BUSINESS = "BUSINESS",
  PERSONAL = "PERSONAL",
}

export enum Period {
  DAY = "DAY",
  WEEK = "WEEK",
}

export enum TweetType {
  LINK = "LINK",
  MEDIA = "MEDIA",
  TEXT = "TEXT",
}

/**
 * Allow manipulating the relationship between the types 'Account' and 'Community'.
 */
export interface AccountCommunitiesRelation {
  readonly create?: ReadonlyArray<(CommunityInput | null)> | null;
  readonly connect?: ReadonlyArray<(string | null)> | null;
  readonly disconnect?: ReadonlyArray<(string | null)> | null;
}

/**
 * 'Account' input values
 */
export interface AccountInput {
  readonly name: string;
  readonly twitterId: string;
  readonly communities?: AccountCommunitiesRelation | null;
  readonly type: AccountType;
}

/**
 * Allow manipulating the relationship between the types 'Community' and 'Account'.
 */
export interface CommunityAccountsRelation {
  readonly create?: ReadonlyArray<(AccountInput | null)> | null;
  readonly connect?: ReadonlyArray<(string | null)> | null;
  readonly disconnect?: ReadonlyArray<(string | null)> | null;
}

/**
 * 'Community' input values
 */
export interface CommunityInput {
  readonly name: string;
  readonly accounts?: CommunityAccountsRelation | null;
}

/**
 * 'Hashtag' input values
 */
export interface HashtagInput {
  readonly text: string;
  readonly indices: ReadonlyArray<number>;
  readonly tweet?: HashtagTweetRelation | null;
}

/**
 * Allow manipulating the relationship between the types 'Hashtag' and 'Tweet' using the field 'Hashtag.tweet'.
 */
export interface HashtagTweetRelation {
  readonly create?: TweetInput | null;
  readonly connect?: string | null;
}

/**
 * Allow manipulating the relationship between the types 'List' and 'Community' using the field 'List.community'.
 */
export interface ListCommunityRelation {
  readonly create?: CommunityInput | null;
  readonly connect?: string | null;
  readonly disconnect?: boolean | null;
}

/**
 * 'List' input values
 */
export interface ListInput {
  readonly community?: ListCommunityRelation | null;
  readonly accountType?: AccountType | null;
  readonly tweetType?: TweetType | null;
  readonly tweets?: ListTweetsRelation | null;
  readonly period: Period;
  readonly startDate: any;
}

/**
 * Allow manipulating the relationship between the types 'List' and 'Tweet'.
 */
export interface ListTweetsRelation {
  readonly create?: ReadonlyArray<(TweetInput | null)> | null;
  readonly connect?: ReadonlyArray<(string | null)> | null;
  readonly disconnect?: ReadonlyArray<(string | null)> | null;
}

/**
 * 'Media' input values
 */
export interface MediaInput {
  readonly displayUrl: string;
  readonly expandedUrl: string;
  readonly indices: ReadonlyArray<number>;
  readonly mediaUrl: string;
  readonly mediaUrlHttps: string;
  readonly sizes?: MediaSizesRelation | null;
  readonly type: string;
  readonly url: string;
  readonly tweet?: MediaTweetRelation | null;
}

/**
 * Allow manipulating the relationship between the types 'Media' and 'Size'.
 */
export interface MediaSizesRelation {
  readonly create?: ReadonlyArray<(SizeInput | null)> | null;
  readonly connect?: ReadonlyArray<(string | null)> | null;
  readonly disconnect?: ReadonlyArray<(string | null)> | null;
}

/**
 * Allow manipulating the relationship between the types 'Media' and 'Tweet' using the field 'Media.tweet'.
 */
export interface MediaTweetRelation {
  readonly create?: TweetInput | null;
  readonly connect?: string | null;
}

/**
 * 'Size' input values
 */
export interface SizeInput {
  readonly width: number;
  readonly height: number;
  readonly resize: string;
  readonly media?: SizeMediaRelation | null;
}

/**
 * Allow manipulating the relationship between the types 'Size' and 'Media' using the field 'Size.media'.
 */
export interface SizeMediaRelation {
  readonly create?: MediaInput | null;
  readonly connect?: string | null;
}

/**
 * 'Symbol' input values
 */
export interface SymbolInput {
  readonly indices: ReadonlyArray<number>;
  readonly text: string;
  readonly tweet?: SymbolTweetRelation | null;
}

/**
 * Allow manipulating the relationship between the types 'Symbol' and 'Tweet' using the field 'Symbol.tweet'.
 */
export interface SymbolTweetRelation {
  readonly create?: TweetInput | null;
  readonly connect?: string | null;
}

/**
 * Allow manipulating the relationship between the types 'Tweet' and 'Account' using the field 'Tweet.account'.
 */
export interface TweetAccountRelation {
  readonly create?: AccountInput | null;
  readonly connect?: string | null;
}

/**
 * Allow manipulating the relationship between the types 'Tweet' and 'Hashtag'.
 */
export interface TweetHashtagsRelation {
  readonly create?: ReadonlyArray<(HashtagInput | null)> | null;
  readonly connect?: ReadonlyArray<(string | null)> | null;
  readonly disconnect?: ReadonlyArray<(string | null)> | null;
}

/**
 * 'Tweet' input values
 */
export interface TweetInput {
  readonly list?: TweetListRelation | null;
  readonly twitterId: string;
  readonly publishedAt: any;
  readonly text: string;
  readonly accountName: string;
  readonly account?: TweetAccountRelation | null;
  readonly favoritesCount: number;
  readonly hashtags?: TweetHashtagsRelation | null;
  readonly media?: TweetMediaRelation | null;
  readonly urls?: TweetUrlsRelation | null;
  readonly userMentions?: TweetUserMentionsRelation | null;
  readonly symbols?: TweetSymbolsRelation | null;
}

/**
 * Allow manipulating the relationship between the types 'Tweet' and 'List' using the field 'Tweet.list'.
 */
export interface TweetListRelation {
  readonly create?: ListInput | null;
  readonly connect?: string | null;
}

/**
 * Allow manipulating the relationship between the types 'Tweet' and 'Media'.
 */
export interface TweetMediaRelation {
  readonly create?: ReadonlyArray<(MediaInput | null)> | null;
  readonly connect?: ReadonlyArray<(string | null)> | null;
  readonly disconnect?: ReadonlyArray<(string | null)> | null;
}

/**
 * Allow manipulating the relationship between the types 'Tweet' and 'Symbol'.
 */
export interface TweetSymbolsRelation {
  readonly create?: ReadonlyArray<(SymbolInput | null)> | null;
  readonly connect?: ReadonlyArray<(string | null)> | null;
  readonly disconnect?: ReadonlyArray<(string | null)> | null;
}

/**
 * Allow manipulating the relationship between the types 'Tweet' and 'Url'.
 */
export interface TweetUrlsRelation {
  readonly create?: ReadonlyArray<(UrlInput | null)> | null;
  readonly connect?: ReadonlyArray<(string | null)> | null;
  readonly disconnect?: ReadonlyArray<(string | null)> | null;
}

/**
 * Allow manipulating the relationship between the types 'Tweet' and 'UserMention'.
 */
export interface TweetUserMentionsRelation {
  readonly create?: ReadonlyArray<(UserMentionInput | null)> | null;
  readonly connect?: ReadonlyArray<(string | null)> | null;
  readonly disconnect?: ReadonlyArray<(string | null)> | null;
}

/**
 * 'UnwoundUrl' input values
 */
export interface UnwoundUrlInput {
  readonly url: string;
  readonly status: number;
  readonly title: string;
  readonly description: string;
  readonly tweet?: UnwoundUrlTweetRelation | null;
}

/**
 * Allow manipulating the relationship between the types 'UnwoundUrl' and 'Tweet' using the field 'UnwoundUrl.tweet'.
 */
export interface UnwoundUrlTweetRelation {
  readonly create?: TweetInput | null;
  readonly connect?: string | null;
}

/**
 * 'Url' input values
 */
export interface UrlInput {
  readonly displayUrl: string;
  readonly expandedUrl: string;
  readonly indices: ReadonlyArray<number>;
  readonly url: string;
  readonly unwound?: UrlUnwoundRelation | null;
  readonly tweet?: UrlTweetRelation | null;
}

/**
 * Allow manipulating the relationship between the types 'Url' and 'Tweet' using the field 'Url.tweet'.
 */
export interface UrlTweetRelation {
  readonly create?: TweetInput | null;
  readonly connect?: string | null;
}

/**
 * Allow manipulating the relationship between the types 'Url' and 'UnwoundUrl' using the field 'Url.unwound'.
 */
export interface UrlUnwoundRelation {
  readonly create?: UnwoundUrlInput | null;
  readonly connect?: string | null;
  readonly disconnect?: boolean | null;
}

/**
 * 'UserMention' input values
 */
export interface UserMentionInput {
  readonly id: string;
  readonly indices: ReadonlyArray<number>;
  readonly name: string;
  readonly screenName: string;
  readonly tweet?: UserMentionTweetRelation | null;
}

/**
 * Allow manipulating the relationship between the types 'UserMention' and 'Tweet' using the field 'UserMention.tweet'.
 */
export interface UserMentionTweetRelation {
  readonly create?: TweetInput | null;
  readonly connect?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
