// interface Filters {
//     period: string;
//     communities: string[];
//     tweetTypes: TweetType[];
//     accountTypes: AccountType[];
//   }

const encode = object => {
  const string = JSON.stringify(object);

  if (typeof window === 'undefined') {
    return Buffer.from(string).toString('base64');
  }

  return window.btoa(string);
};

console.log(encode({ period: 'DAY', communities: [], tweetTypes: [], accountTypes: [] }));
