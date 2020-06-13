describe('parseTweets', () => {
  it('ok', () => {});
});
// import { ApiTweet, createCommunitiesFilters } from '../parseTweets';
// import dayjs from 'dayjs';
// import {
//   getListObjects,
//   Filter,
//   Community,
//   Account,
//   AccountTweet,
//   getDaysInInterval,
//   createDateTweetFilterFn,
// } from '../parseTweets';

// const createAccount = ({
//   communities,
//   _id,
//   name,
//   twitterId,
// }: {
//   communities: Community[];
//   _id: string;
//   name: string;
//   twitterId: string;
// }): Account => ({
//   _id,
//   name,
//   twitterId,
//   communities: {
//     data: communities,
//   },
// });

// const COMMUNITIES: Community[] = [
//   {
//     _id: '1',
//     name: 'React',
//   },
//   {
//     _id: '2',
//     name: 'Vue',
//   },
// ];

// const createTweet = ({
//   created_at,
//   favorite_count,
//   media,
//   urls,
// }: {
//   created_at: string;
//   favorite_count: number;
//   media: any[];
//   urls: any[];
// }): ApiTweet => ({
//   created_at,
//   entities: {
//     media,
//     urls,
//   },
//   favorite_count,
//   __accountId: '123',
//   full_text: 'text',
//   id: 123,
//   id_str: '123',
//   user: {
//     name: 'hey',
//   },
// });

// const createTextTweet = ({
//   created_at,
//   favorite_count,
// }: {
//   created_at: string;
//   favorite_count: number;
// }) => createTweet({ created_at, favorite_count, media: [], urls: [] });

// const createMediaTweet = ({
//   created_at,
//   favorite_count,
// }: {
//   created_at: string;
//   favorite_count: number;
// }) =>
//   createTweet({
//     created_at,
//     favorite_count,
//     media: ['random stuff'],
//     urls: [],
//   });

// const createLinkTweet = ({
//   created_at,
//   favorite_count,
// }: {
//   created_at: string;
//   favorite_count: number;
// }) =>
//   createTweet({
//     created_at,
//     favorite_count,
//     media: [],
//     urls: ['random stuff'],
//   });

// describe('parseTweets', () => {
//   describe('getListObjects', () => {
//     it('works with NO filters', () => {
//       const account1 = createAccount({
//         _id: '1',
//         communities: [COMMUNITIES[0]],
//         name: 'Jack',
//         twitterId: '1',
//       });

//       // text
//       const tweet1 = createTextTweet({ created_at: '2020-01-01', favorite_count: 5 });
//       const tweet2 = createTextTweet({ created_at: '2020-01-01', favorite_count: 4 });

//       // link
//       const tweet3 = createLinkTweet({ created_at: '2020-01-01', favorite_count: 3 });

//       // media
//       const tweet4 = createMediaTweet({ created_at: '2020-01-01', favorite_count: 2 });

//       const sortedAccountTweets: AccountTweet[] = [
//         {
//           account: account1,
//           tweets: [tweet1, tweet2, tweet3, tweet4],
//         },
//       ];

//       const listObjects = getListObjects({
//         sortedAccountTweets,
//         appliedFilters: [],
//         remainingFilters: [],
//       });

//       expect(listObjects).toHaveLength(4); // ALL, TEXT, MEDIA, and LINK tweet types
//       expect(listObjects).toMatchSnapshot();
//     });

//     it('works with DATE filters', () => {
//       const account1 = createAccount({
//         _id: '1',
//         communities: [COMMUNITIES[0]],
//         name: 'Jack',
//         twitterId: '1',
//       });

//       const account2 = createAccount({
//         _id: '1',
//         communities: [COMMUNITIES[1]],
//         name: 'Jane',
//         twitterId: '1',
//       });

//       // 2020-01-01
//       const tweet1 = createTextTweet({ created_at: '2020-01-01', favorite_count: 5 });
//       const tweet2 = createTextTweet({ created_at: '2020-01-01', favorite_count: 4 });
//       const tweet3 = createTextTweet({ created_at: '2020-01-01', favorite_count: 5 });
//       const tweet4 = createTextTweet({ created_at: '2020-01-01', favorite_count: 4 });

//       // 2020-01-02
//       const tweet5 = createTextTweet({ created_at: '2020-01-02', favorite_count: 3 });
//       const tweet6 = createTextTweet({ created_at: '2020-01-02', favorite_count: 3 });

//       const sortedAccountTweets: AccountTweet[] = [
//         {
//           account: account1,
//           tweets: [tweet1, tweet2, tweet5],
//         },
//         {
//           account: account2,
//           tweets: [tweet3, tweet4, tweet6],
//         },
//       ];

//       const dateFilters: Filter[] = getDaysInInterval({
//         startDay: dayjs('2020-01-01'),
//         daysCount: 2,
//       }).map(({ startDate, endDate }) => ({
//         fields: {
//           period: 'DAY',
//           startDate: startDate.toISOString(),
//         },
//         filterTweets: createDateTweetFilterFn({ startDate, endDate }),
//       }));

//       const listObjects = getListObjects({
//         sortedAccountTweets,
//         appliedFilters: [],
//         remainingFilters: [dateFilters],
//       });

//       expect(listObjects).toHaveLength(12); // ALL, TEXT, MEDIA, and LINK tweet types
//       expect(listObjects).toMatchSnapshot();
//     });

//     it.only('works with DATE and COMMUNITIES filters', () => {
//       const account1 = createAccount({
//         _id: '1',
//         communities: [COMMUNITIES[0]],
//         name: 'Jack',
//         twitterId: '1',
//       });

//       const account2 = createAccount({
//         _id: '1',
//         communities: [COMMUNITIES[1]],
//         name: 'Jane',
//         twitterId: '1',
//       });

//       // 2020-01-01
//       const tweet1 = createTextTweet({ created_at: '2020-01-01', favorite_count: 5 });
//       const tweet2 = createTextTweet({ created_at: '2020-01-01', favorite_count: 4 });
//       const tweet3 = createTextTweet({ created_at: '2020-01-01', favorite_count: 5 });
//       const tweet4 = createTextTweet({ created_at: '2020-01-01', favorite_count: 4 });

//       // 2020-01-02
//       const tweet5 = createTextTweet({ created_at: '2020-01-02', favorite_count: 3 });
//       const tweet6 = createTextTweet({ created_at: '2020-01-02', favorite_count: 3 });

//       const sortedAccountTweets: AccountTweet[] = [
//         {
//           account: account1,
//           tweets: [tweet1, tweet2, tweet5],
//         },
//         {
//           account: account2,
//           tweets: [tweet3, tweet4, tweet6],
//         },
//       ];

//       const dateFilters: Filter[] = getDaysInInterval({
//         startDay: dayjs('2020-01-01'),
//         daysCount: 2,
//       }).map(({ startDate, endDate }) => ({
//         fields: {
//           period: 'DAY',
//           startDate: startDate.toISOString(),
//         },
//         filterTweets: createDateTweetFilterFn({ startDate, endDate }),
//       }));

//       const communitiesFilters: Filter[] = createCommunitiesFilters(COMMUNITIES);

//       const listObjects = getListObjects({
//         sortedAccountTweets,
//         appliedFilters: [],
//         remainingFilters: [dateFilters, communitiesFilters],
//       });

//       expect(listObjects).toHaveLength(52); // draw a tree...
//       expect(listObjects).toMatchSnapshot();
//     });
//   });
// });
