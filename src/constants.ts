export const FAQ_ITEMS = [
  {
    title: 'Why only top *10* tweets? 😕',
    body:
      "That's the purpose! TwitterFOMO is about *fighting* FOMO and procrastination. NOT about procrastinating here instead of Twitter.",
  },
  {
    title: 'How are the top tweets curated?',
    body:
      'We’re gathering all the tweets from a handpicked list of accounts tweeting about "webdev" from which we’re selected the most liked ones.',
  },
  {
    title: 'How does the newsletter work?',
    body:
      'Currently, we’re sending the newsletter on a monthly basis and it includes the most liked tweets in a month. However, we plan to create a premium newsletter which you’ll have the option to get weekly and also filter out only the types of tweets you’d like to get.',
  },
  {
    title: 'How to filter out “off-topic” tweets?',
    body:
      'We get it. You want to read what’s new in webdev and you’re shown a picture of cute little kittens instead. (Nothing against posting these on Twitter, of course!) Currently, the only thing that might help is to filter the tweets according to their types (e. g. show only text tweets). But we do plan to create a more sophisticated system to only show relevant tweets in the future! Stay tuned.',
  },
  {
    title: 'I saw a popular tweet on Twitter but it’s not showing up here!!?!?? 😡🤬🤯',
    body:
      'Yes, that can happen. The list of the accounts whose tweets we go through is limited (and handpicked) and although we tried hard not to miss any “big” accounts we still might have missed them. Or there simply could have been a popular tweet from a “small” account which we don’t have in our DB. You can DM me on Twitter to fix this!',
  },
  {
    title: 'What tech stack does TwitterFOMO use?',
    body:
      'ALL THE BUZZWORDS!!! React.js, ChakraUI, Next.js, Prisma, Vercel and I’m just scratching the surface.',
  },
  {
    title: 'How can I support TwitterFOMO?',
    body:
      'Currently, the only way is by visiting our page regularly, spreading the word about it and subscribing to our newsletter. However, we are considering a premium tier in the future, so don’t worry, you’ll have the possibility to spend your paycheck here 😇',
  },
];

export const DEFAULT_FILTER =
  'eyJwZXJpb2QiOiJEQVkiLCJjb21tdW5pdGllcyI6W10sInR3ZWV0VHlwZXMiOltdLCJhY2NvdW50VHlwZXMiOltdfQ==';

export const LEADERBOARD_LINK = `/leaderboard/${DEFAULT_FILTER}`;
