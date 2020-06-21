require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: 'faunaDB',
      url: 'https://graphql.fauna.com/graphql',
      headers: { Authorization: `Bearer ${process.env.FAUNA_SECRET}` },
    },
    includes: ['./backend/**/*.ts', './pages/**/*.{ts,tsx}'],
  },
};
