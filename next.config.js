module.exports = {
  async redirects() {
    return [
      {
        source: '/leaderboard',
        destination:
          '/leaderboard/eyJwZXJpb2QiOiJEQVkiLCJjb21tdW5pdGllcyI6W10sInR3ZWV0VHlwZXMiOltdLCJhY2NvdW50VHlwZXMiOltdfQ==',
        permanent: false,
      },
    ];
  },
};
