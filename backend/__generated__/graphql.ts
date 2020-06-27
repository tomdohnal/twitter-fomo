export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  Time: any;
  Date: any;
};

export type Account = {
  __typename?: 'Account';
  name: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  twitterId: Scalars['String'];
  communities: CommunityPage;
  type: AccountType;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type AccountCommunitiesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Account' and 'Community'. */
export type AccountCommunitiesRelation = {
  /** Create one or more documents of type 'Community' and associate them with the current document. */
  create?: Maybe<Array<Maybe<CommunityInput>>>;
  /** Connect one or more documents of type 'Community' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Community' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** 'Account' input values */
export type AccountInput = {
  name: Scalars['String'];
  twitterId: Scalars['String'];
  communities?: Maybe<AccountCommunitiesRelation>;
  type: AccountType;
};

/** The pagination object for elements of type 'Account'. */
export type AccountPage = {
  __typename?: 'AccountPage';
  /** The elements of type 'Account' in this page. */
  data: Array<Maybe<Account>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export enum AccountType {
  Personal = 'PERSONAL',
  Business = 'BUSINESS'
}

export type Community = {
  __typename?: 'Community';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  name: Scalars['String'];
  accounts: AccountPage;
};


export type CommunityAccountsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Community' and 'Account'. */
export type CommunityAccountsRelation = {
  /** Create one or more documents of type 'Account' and associate them with the current document. */
  create?: Maybe<Array<Maybe<AccountInput>>>;
  /** Connect one or more documents of type 'Account' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Account' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** 'Community' input values */
export type CommunityInput = {
  name: Scalars['String'];
  accounts?: Maybe<CommunityAccountsRelation>;
};

/** The pagination object for elements of type 'Community'. */
export type CommunityPage = {
  __typename?: 'CommunityPage';
  /** The elements of type 'Community' in this page. */
  data: Array<Maybe<Community>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};


export type Hashtag = {
  __typename?: 'Hashtag';
  indices: Array<Scalars['Int']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  tweet: Tweet;
  text: Scalars['String'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'Hashtag' input values */
export type HashtagInput = {
  text: Scalars['String'];
  indices: Array<Scalars['Int']>;
  tweet?: Maybe<HashtagTweetRelation>;
};

/** The pagination object for elements of type 'Hashtag'. */
export type HashtagPage = {
  __typename?: 'HashtagPage';
  /** The elements of type 'Hashtag' in this page. */
  data: Array<Maybe<Hashtag>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Hashtag' and 'Tweet' using the field 'Hashtag.tweet'. */
export type HashtagTweetRelation = {
  /** Create a document of type 'Tweet' and associate it with the current document. */
  create?: Maybe<TweetInput>;
  /** Connect a document of type 'Tweet' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

export type List = {
  __typename?: 'List';
  community?: Maybe<Community>;
  tweetType?: Maybe<TweetType>;
  /** The document's ID. */
  _id: Scalars['ID'];
  accountType?: Maybe<AccountType>;
  period: Period;
  tweets: TweetPage;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type ListTweetsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'List' and 'Community' using the field 'List.community'. */
export type ListCommunityRelation = {
  /** Create a document of type 'Community' and associate it with the current document. */
  create?: Maybe<CommunityInput>;
  /** Connect a document of type 'Community' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
  /** If true, disconnects this document from 'Community' */
  disconnect?: Maybe<Scalars['Boolean']>;
};

/** 'List' input values */
export type ListInput = {
  community?: Maybe<ListCommunityRelation>;
  accountType?: Maybe<AccountType>;
  tweetType?: Maybe<TweetType>;
  tweets?: Maybe<ListTweetsRelation>;
  period: Period;
};

/** The pagination object for elements of type 'List'. */
export type ListPage = {
  __typename?: 'ListPage';
  /** The elements of type 'List' in this page. */
  data: Array<Maybe<List>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'List' and 'Tweet'. */
export type ListTweetsRelation = {
  /** Create one or more documents of type 'Tweet' and associate them with the current document. */
  create?: Maybe<Array<Maybe<TweetInput>>>;
  /** Connect one or more documents of type 'Tweet' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Tweet' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type Media = {
  __typename?: 'Media';
  expandedUrl: Scalars['String'];
  indices: Array<Scalars['Int']>;
  url: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  tweet: Tweet;
  mediaUrl: Scalars['String'];
  displayUrl: Scalars['String'];
  mediaUrlHttps: Scalars['String'];
  sizes: SizePage;
  type: Scalars['String'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type MediaSizesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** 'Media' input values */
export type MediaInput = {
  displayUrl: Scalars['String'];
  expandedUrl: Scalars['String'];
  indices: Array<Scalars['Int']>;
  mediaUrl: Scalars['String'];
  mediaUrlHttps: Scalars['String'];
  sizes?: Maybe<MediaSizesRelation>;
  type: Scalars['String'];
  url: Scalars['String'];
  tweet?: Maybe<MediaTweetRelation>;
};

/** The pagination object for elements of type 'Media'. */
export type MediaPage = {
  __typename?: 'MediaPage';
  /** The elements of type 'Media' in this page. */
  data: Array<Maybe<Media>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Media' and 'Size'. */
export type MediaSizesRelation = {
  /** Create one or more documents of type 'Size' and associate them with the current document. */
  create?: Maybe<Array<Maybe<SizeInput>>>;
  /** Connect one or more documents of type 'Size' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Size' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Allow manipulating the relationship between the types 'Media' and 'Tweet' using the field 'Media.tweet'. */
export type MediaTweetRelation = {
  /** Create a document of type 'Tweet' and associate it with the current document. */
  create?: Maybe<TweetInput>;
  /** Connect a document of type 'Tweet' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Update an existing document in the collection of 'Url' */
  updateUrl?: Maybe<Url>;
  /** Create a new document in the collection of 'UnwoundUrl' */
  createUnwoundUrl: UnwoundUrl;
  /** Delete an existing document in the collection of 'Hashtag' */
  deleteHashtag?: Maybe<Hashtag>;
  /** Update an existing document in the collection of 'Size' */
  updateSize?: Maybe<Size>;
  /** Update an existing document in the collection of 'Community' */
  updateCommunity?: Maybe<Community>;
  /** Delete an existing document in the collection of 'Size' */
  deleteSize?: Maybe<Size>;
  /** Create a new document in the collection of 'List' */
  createList: List;
  /** Create a new document in the collection of 'Url' */
  createUrl: Url;
  /** Create a new document in the collection of 'Size' */
  createSize: Size;
  /** Delete an existing document in the collection of 'Tweet' */
  deleteTweet?: Maybe<Tweet>;
  /** Update an existing document in the collection of 'Media' */
  updateMedia?: Maybe<Media>;
  /** Delete an existing document in the collection of 'Account' */
  deleteAccount?: Maybe<Account>;
  /** Update an existing document in the collection of 'UnwoundUrl' */
  updateUnwoundUrl?: Maybe<UnwoundUrl>;
  /** Update an existing document in the collection of 'UserMention' */
  updateUserMention?: Maybe<UserMention>;
  /** Create a new document in the collection of 'Media' */
  createMedia: Media;
  /** Delete an existing document in the collection of 'Community' */
  deleteCommunity?: Maybe<Community>;
  /** Create a new document in the collection of 'Symbol' */
  createSymbol: Symbol;
  /** Create a new document in the collection of 'Tweet' */
  createTweet: Tweet;
  /** Update an existing document in the collection of 'Account' */
  updateAccount?: Maybe<Account>;
  /** Create a new document in the collection of 'Hashtag' */
  createHashtag: Hashtag;
  /** Create a new document in the collection of 'UserMention' */
  createUserMention: UserMention;
  /** Delete an existing document in the collection of 'Url' */
  deleteUrl?: Maybe<Url>;
  /** Update an existing document in the collection of 'Tweet' */
  updateTweet?: Maybe<Tweet>;
  /** Delete an existing document in the collection of 'UnwoundUrl' */
  deleteUnwoundUrl?: Maybe<UnwoundUrl>;
  /** Delete an existing document in the collection of 'Symbol' */
  deleteSymbol?: Maybe<Symbol>;
  /** Delete an existing document in the collection of 'UserMention' */
  deleteUserMention?: Maybe<UserMention>;
  /** Create a new document in the collection of 'Account' */
  createAccount: Account;
  /** Create a new document in the collection of 'Community' */
  createCommunity: Community;
  /** Delete an existing document in the collection of 'List' */
  deleteList?: Maybe<List>;
  /** Update an existing document in the collection of 'Symbol' */
  updateSymbol?: Maybe<Symbol>;
  /** Delete an existing document in the collection of 'Media' */
  deleteMedia?: Maybe<Media>;
  /** Update an existing document in the collection of 'List' */
  updateList?: Maybe<List>;
  /** Update an existing document in the collection of 'Hashtag' */
  updateHashtag?: Maybe<Hashtag>;
};


export type MutationUpdateUrlArgs = {
  id: Scalars['ID'];
  data: UrlInput;
};


export type MutationCreateUnwoundUrlArgs = {
  data: UnwoundUrlInput;
};


export type MutationDeleteHashtagArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateSizeArgs = {
  id: Scalars['ID'];
  data: SizeInput;
};


export type MutationUpdateCommunityArgs = {
  id: Scalars['ID'];
  data: CommunityInput;
};


export type MutationDeleteSizeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateListArgs = {
  data: ListInput;
};


export type MutationCreateUrlArgs = {
  data: UrlInput;
};


export type MutationCreateSizeArgs = {
  data: SizeInput;
};


export type MutationDeleteTweetArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateMediaArgs = {
  id: Scalars['ID'];
  data: MediaInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateUnwoundUrlArgs = {
  id: Scalars['ID'];
  data: UnwoundUrlInput;
};


export type MutationUpdateUserMentionArgs = {
  id: Scalars['ID'];
  data: UserMentionInput;
};


export type MutationCreateMediaArgs = {
  data: MediaInput;
};


export type MutationDeleteCommunityArgs = {
  id: Scalars['ID'];
};


export type MutationCreateSymbolArgs = {
  data: SymbolInput;
};


export type MutationCreateTweetArgs = {
  data: TweetInput;
};


export type MutationUpdateAccountArgs = {
  id: Scalars['ID'];
  data: AccountInput;
};


export type MutationCreateHashtagArgs = {
  data: HashtagInput;
};


export type MutationCreateUserMentionArgs = {
  data: UserMentionInput;
};


export type MutationDeleteUrlArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTweetArgs = {
  id: Scalars['ID'];
  data: TweetInput;
};


export type MutationDeleteUnwoundUrlArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSymbolArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserMentionArgs = {
  id: Scalars['ID'];
};


export type MutationCreateAccountArgs = {
  data: AccountInput;
};


export type MutationCreateCommunityArgs = {
  data: CommunityInput;
};


export type MutationDeleteListArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateSymbolArgs = {
  id: Scalars['ID'];
  data: SymbolInput;
};


export type MutationDeleteMediaArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateListArgs = {
  id: Scalars['ID'];
  data: ListInput;
};


export type MutationUpdateHashtagArgs = {
  id: Scalars['ID'];
  data: HashtagInput;
};

export enum Period {
  Day = 'DAY',
  Week = 'WEEK'
}

export type Query = {
  __typename?: 'Query';
  /** Find a document from the collection of 'Url' by its id. */
  findUrlByID?: Maybe<Url>;
  recentList?: Maybe<List>;
  allLists: ListPage;
  /** Find a document from the collection of 'Community' by its id. */
  findCommunityByID?: Maybe<Community>;
  allCommunities: CommunityPage;
  /** Find a document from the collection of 'Tweet' by its id. */
  findTweetByID?: Maybe<Tweet>;
  /** Find a document from the collection of 'Size' by its id. */
  findSizeByID?: Maybe<Size>;
  /** Find a document from the collection of 'List' by its id. */
  findListByID?: Maybe<List>;
  /** Find a document from the collection of 'UnwoundUrl' by its id. */
  findUnwoundUrlByID?: Maybe<UnwoundUrl>;
  /** Find a document from the collection of 'Symbol' by its id. */
  findSymbolByID?: Maybe<Symbol>;
  /** Find a document from the collection of 'Media' by its id. */
  findMediaByID?: Maybe<Media>;
  /** Find a document from the collection of 'Hashtag' by its id. */
  findHashtagByID?: Maybe<Hashtag>;
  allAccounts: AccountPage;
  /** Find a document from the collection of 'Account' by its id. */
  findAccountByID?: Maybe<Account>;
  /** Find a document from the collection of 'UserMention' by its id. */
  findUserMentionByID?: Maybe<UserMention>;
};


export type QueryFindUrlByIdArgs = {
  id: Scalars['ID'];
};


export type QueryRecentListArgs = {
  communityId?: Maybe<Scalars['ID']>;
  tweetType?: Maybe<TweetType>;
  accountType?: Maybe<AccountType>;
  period: Period;
};


export type QueryAllListsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindCommunityByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllCommunitiesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindTweetByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindSizeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindListByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUnwoundUrlByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindSymbolByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindMediaByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindHashtagByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllAccountsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindAccountByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserMentionByIdArgs = {
  id: Scalars['ID'];
};

export type Size = {
  __typename?: 'Size';
  /** The document's ID. */
  _id: Scalars['ID'];
  height: Scalars['Int'];
  resize: Scalars['String'];
  media: Media;
  width: Scalars['Int'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'Size' input values */
export type SizeInput = {
  width: Scalars['Int'];
  height: Scalars['Int'];
  resize: Scalars['String'];
  media?: Maybe<SizeMediaRelation>;
};

/** Allow manipulating the relationship between the types 'Size' and 'Media' using the field 'Size.media'. */
export type SizeMediaRelation = {
  /** Create a document of type 'Media' and associate it with the current document. */
  create?: Maybe<MediaInput>;
  /** Connect a document of type 'Media' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

/** The pagination object for elements of type 'Size'. */
export type SizePage = {
  __typename?: 'SizePage';
  /** The elements of type 'Size' in this page. */
  data: Array<Maybe<Size>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Symbol = {
  __typename?: 'Symbol';
  indices: Array<Scalars['Int']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  tweet: Tweet;
  text: Scalars['String'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'Symbol' input values */
export type SymbolInput = {
  indices: Array<Scalars['Int']>;
  text: Scalars['String'];
  tweet?: Maybe<SymbolTweetRelation>;
};

/** The pagination object for elements of type 'Symbol'. */
export type SymbolPage = {
  __typename?: 'SymbolPage';
  /** The elements of type 'Symbol' in this page. */
  data: Array<Maybe<Symbol>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Symbol' and 'Tweet' using the field 'Symbol.tweet'. */
export type SymbolTweetRelation = {
  /** Create a document of type 'Tweet' and associate it with the current document. */
  create?: Maybe<TweetInput>;
  /** Connect a document of type 'Tweet' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};


export type Tweet = {
  __typename?: 'Tweet';
  favoritesCount: Scalars['Int'];
  accountName: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  urls: UrlPage;
  userMentions: UserMentionPage;
  twitterId: Scalars['String'];
  text: Scalars['String'];
  symbols: SymbolPage;
  media: MediaPage;
  account: Account;
  publishedAt: Scalars['Time'];
  list: List;
  hashtags: HashtagPage;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type TweetUrlsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type TweetUserMentionsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type TweetSymbolsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type TweetMediaArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type TweetHashtagsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Tweet' and 'Account' using the field 'Tweet.account'. */
export type TweetAccountRelation = {
  /** Create a document of type 'Account' and associate it with the current document. */
  create?: Maybe<AccountInput>;
  /** Connect a document of type 'Account' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'Tweet' and 'Hashtag'. */
export type TweetHashtagsRelation = {
  /** Create one or more documents of type 'Hashtag' and associate them with the current document. */
  create?: Maybe<Array<Maybe<HashtagInput>>>;
  /** Connect one or more documents of type 'Hashtag' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Hashtag' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** 'Tweet' input values */
export type TweetInput = {
  list?: Maybe<TweetListRelation>;
  twitterId: Scalars['String'];
  publishedAt: Scalars['Time'];
  text: Scalars['String'];
  accountName: Scalars['String'];
  account?: Maybe<TweetAccountRelation>;
  favoritesCount: Scalars['Int'];
  hashtags?: Maybe<TweetHashtagsRelation>;
  media?: Maybe<TweetMediaRelation>;
  urls?: Maybe<TweetUrlsRelation>;
  userMentions?: Maybe<TweetUserMentionsRelation>;
  symbols?: Maybe<TweetSymbolsRelation>;
};

/** Allow manipulating the relationship between the types 'Tweet' and 'List' using the field 'Tweet.list'. */
export type TweetListRelation = {
  /** Create a document of type 'List' and associate it with the current document. */
  create?: Maybe<ListInput>;
  /** Connect a document of type 'List' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'Tweet' and 'Media'. */
export type TweetMediaRelation = {
  /** Create one or more documents of type 'Media' and associate them with the current document. */
  create?: Maybe<Array<Maybe<MediaInput>>>;
  /** Connect one or more documents of type 'Media' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Media' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** The pagination object for elements of type 'Tweet'. */
export type TweetPage = {
  __typename?: 'TweetPage';
  /** The elements of type 'Tweet' in this page. */
  data: Array<Maybe<Tweet>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Tweet' and 'Symbol'. */
export type TweetSymbolsRelation = {
  /** Create one or more documents of type 'Symbol' and associate them with the current document. */
  create?: Maybe<Array<Maybe<SymbolInput>>>;
  /** Connect one or more documents of type 'Symbol' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Symbol' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export enum TweetType {
  Text = 'TEXT',
  Media = 'MEDIA',
  Link = 'LINK'
}

/** Allow manipulating the relationship between the types 'Tweet' and 'Url'. */
export type TweetUrlsRelation = {
  /** Create one or more documents of type 'Url' and associate them with the current document. */
  create?: Maybe<Array<Maybe<UrlInput>>>;
  /** Connect one or more documents of type 'Url' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'Url' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Allow manipulating the relationship between the types 'Tweet' and 'UserMention'. */
export type TweetUserMentionsRelation = {
  /** Create one or more documents of type 'UserMention' and associate them with the current document. */
  create?: Maybe<Array<Maybe<UserMentionInput>>>;
  /** Connect one or more documents of type 'UserMention' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Disconnect the given documents of type 'UserMention' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UnwoundUrl = {
  __typename?: 'UnwoundUrl';
  url: Scalars['String'];
  description: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  tweet: Tweet;
  status: Scalars['Int'];
  title: Scalars['String'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'UnwoundUrl' input values */
export type UnwoundUrlInput = {
  url: Scalars['String'];
  status: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  tweet?: Maybe<UnwoundUrlTweetRelation>;
};

/** Allow manipulating the relationship between the types 'UnwoundUrl' and 'Tweet' using the field 'UnwoundUrl.tweet'. */
export type UnwoundUrlTweetRelation = {
  /** Create a document of type 'Tweet' and associate it with the current document. */
  create?: Maybe<TweetInput>;
  /** Connect a document of type 'Tweet' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

export type Url = {
  __typename?: 'Url';
  expandedUrl: Scalars['String'];
  unwound?: Maybe<UnwoundUrl>;
  indices: Array<Scalars['Int']>;
  url: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  tweet: Tweet;
  displayUrl: Scalars['String'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'Url' input values */
export type UrlInput = {
  displayUrl: Scalars['String'];
  expandedUrl: Scalars['String'];
  indices: Array<Scalars['Int']>;
  url: Scalars['String'];
  unwound?: Maybe<UrlUnwoundRelation>;
  tweet?: Maybe<UrlTweetRelation>;
};

/** The pagination object for elements of type 'Url'. */
export type UrlPage = {
  __typename?: 'UrlPage';
  /** The elements of type 'Url' in this page. */
  data: Array<Maybe<Url>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'Url' and 'Tweet' using the field 'Url.tweet'. */
export type UrlTweetRelation = {
  /** Create a document of type 'Tweet' and associate it with the current document. */
  create?: Maybe<TweetInput>;
  /** Connect a document of type 'Tweet' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'Url' and 'UnwoundUrl' using the field 'Url.unwound'. */
export type UrlUnwoundRelation = {
  /** Create a document of type 'UnwoundUrl' and associate it with the current document. */
  create?: Maybe<UnwoundUrlInput>;
  /** Connect a document of type 'UnwoundUrl' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
  /** If true, disconnects this document from 'UnwoundUrl' */
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type UserMention = {
  __typename?: 'UserMention';
  name: Scalars['String'];
  indices: Array<Scalars['Int']>;
  screenName: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  tweet: Tweet;
  id: Scalars['String'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** 'UserMention' input values */
export type UserMentionInput = {
  id: Scalars['String'];
  indices: Array<Scalars['Int']>;
  name: Scalars['String'];
  screenName: Scalars['String'];
  tweet?: Maybe<UserMentionTweetRelation>;
};

/** The pagination object for elements of type 'UserMention'. */
export type UserMentionPage = {
  __typename?: 'UserMentionPage';
  /** The elements of type 'UserMention' in this page. */
  data: Array<Maybe<UserMention>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

/** Allow manipulating the relationship between the types 'UserMention' and 'Tweet' using the field 'UserMention.tweet'. */
export type UserMentionTweetRelation = {
  /** Create a document of type 'Tweet' and associate it with the current document. */
  create?: Maybe<TweetInput>;
  /** Connect a document of type 'Tweet' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

export type CommunityBasicFragment = (
  { __typename?: 'Community' }
  & Pick<Community, '_id' | 'name'>
);

export type AllCommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCommunitiesQuery = (
  { __typename?: 'Query' }
  & { allCommunities: (
    { __typename?: 'CommunityPage' }
    & { data: Array<Maybe<(
      { __typename?: 'Community' }
      & CommunityBasicFragment
    )>> }
  ) }
);

export type AccountBasicFragment = (
  { __typename?: 'Account' }
  & Pick<Account, '_id' | 'twitterId' | 'name' | 'type'>
  & { communities: (
    { __typename?: 'CommunityPage' }
    & { data: Array<Maybe<(
      { __typename?: 'Community' }
      & Pick<Community, '_id'>
    )>> }
  ) }
);

export type AllAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAccountsQuery = (
  { __typename?: 'Query' }
  & { allAccounts: (
    { __typename?: 'AccountPage' }
    & { data: Array<Maybe<(
      { __typename?: 'Account' }
      & AccountBasicFragment
    )>> }
  ) }
);

export type CreateListMutationVariables = Exact<{
  list: ListInput;
}>;


export type CreateListMutation = (
  { __typename?: 'Mutation' }
  & { createList: (
    { __typename?: 'List' }
    & Pick<List, '_id'>
  ) }
);
