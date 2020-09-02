module.exports = {
  async redirects() {
    return [
      {
        source: '/leaderboard',
        destination: '/leaderboard/eyJwZXJpb2QiOiJEQVkifQ==',
        permanent: false,
      },
    ]
  },
}
