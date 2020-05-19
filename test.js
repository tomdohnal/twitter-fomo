const Twitter = require('twitter-lite')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const axios = require('axios')
const R = require('ramda')
const { promisify } = require('util')
require('dotenv').config()

dayjs.extend(utc)

const sleep = promisify(setTimeout)

const logger = {
    error(err) {
        // TODO: add Sentry or similar
        console.error(err)
    },
}

const getApp = () =>
    Promise.resolve(
        new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        }),
    )
        .then(user => user.getBearerToken())
        .then(response => {
            return new Twitter({
                bearer_token: response.access_token,
            })
        })

async function pauseExecution(resetTimestamp) {
    const currentTimestamp = Date.now() / 1000

    // + 5 is to allow for possible rounding errors / mistakes
    await sleep((resetTimestamp - currentTimestamp + 5) * 1000)
}

async function fetchTweetsForAccount({ twitterId, app, startDate, endDate }) {
    let tweets = []
    let lastTweetDate = null

    do {
        const lastTweet = tweets[tweets.length - 1]
        const lastTweetId = lastTweet && lastTweet.id

        // eslint-disable-next-line no-await-in-loop
        const fetchedTweets = await app
            .get('statuses/user_timeline', {
                user_id: twitterId,
                count: 200,
                include_rts: false,
                exclude_replies: true,
                ...(lastTweetId && { max_id: lastTweetId }),
            })
            .then(async res => {
                const apiLimitRemaining = parseInt(
                    // eslint-disable-next-line no-underscore-dangle
                    res._headers.get('x-rate-limit-remaining'),
                    10,
                )

                console.log({ apiLimitRemaining })

                if (apiLimitRemaining === 0) {
                    const resetTimestamp = parseInt(
                        // eslint-disable-next-line no-underscore-dangle
                        res._headers.get('x-rate-limit-reset'),
                        10,
                    )

                    await pauseExecution(resetTimestamp)
                }

                return res
            })
            .catch(async err => {
                logger.error(err)

                // handle limit exceeded
                if (err.errors[0].code === 88) {
                    console.log('sleeping')
                    await sleep(60000) // sleep for 1 minute
                }
            })

        lastTweetDate = dayjs.utc(
            fetchedTweets[fetchedTweets.length - 1].created_at,
        )

        tweets = tweets.concat(fetchedTweets)
    } while (endDate.isBefore(lastTweetDate))

    // TODO: possible perf boost - the tweets are sorted
    // by date so you can leverage that when filtering.
    // But premature optimization for now IMO
    return tweets.filter(tweet => {
        const tweetDate = dayjs.utc(tweet.created_at)

        return tweetDate.isAfter(startDate) && tweetDate.isBefore(endDate)
    })
}

const allAccountsQuery = /* GraphQL */ `
    query {
        allAccounts {
            data {
                twitterId
                name
                communities {
                    data {
                        name
                    }
                }
                type
            }
        }
    }
`

const allCommunitiesQuery = /* GraphQL */ `
    {
        allCommunities(_size: 100) {
            data {
                _id
                name
            }
        }
    }
`

const accountTypesQuery = /* GraphQL */ `
    {
        __type(name: "AccountType") {
            enumValues {
                name
            }
        }
    }
`

function isTextTweet(tweet) {
    return tweet.entities.every(entity => entity.length === 0)
}

// the tweets must be sorted
function getTopTweets({ tweets }) {
    // for (let i = 0; i < tweets)
}

async function run() {
    const DAY_NOW = dayjs.utc().startOf('day')
    const DAY_BEFORE_ONE_WEEK = DAY_NOW.subtract(1, 'week')
    const twitterApp = await getApp()

    const accounts = await axios
        .post(
            'https://graphql.fauna.com/graphql',
            {
                query: allAccountsQuery,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.FAUNA_SECRET}`,
                },
            },
        )
        .then(R.path(['data', 'data', 'allAccounts', 'data']))

    const topAccountTweets = {}

    // eslint-disable-next-line no-restricted-syntax
    for (const account of accounts) {
        console.log('start')
        // eslint-disable-next-line no-await-in-loop
        const accountTweets = await fetchTweetsForAccount({
            twitterId: account.twitterId,
            app: twitterApp,
            startDate: DAY_BEFORE_ONE_WEEK,
            endDate: DAY_NOW,
        })
            .catch(logger.error)
            .then(R.sort((a, b) => b.favorite_count - a.favorite_count))

        console.log(accountTweets[0])

        return
    }
}

run()
