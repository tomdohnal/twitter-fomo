# [TwitterFOMO.dev](https://twitterfomo.dev)—Best WebDev Tweets
Top webdev tweets. See the most liked tweets in webdev. No mindless scrolling.

> [Follow me on Twitter](https://twitter.com/tom_dohnal) | [Check out my YouTube channel](https://www.youtube.com/channel/UCE7h4of6ywpAG87KXHV6UrQ)

![CI status](https://github.com/tomdohnal/twitter-fomo/workflows/CI/badge.svg)

## The codebase
### App
> Clone the repo and run `yarn && yarn dev` to run it locally

The app is built using the [Next.js](https://nextjs.org/) framework. We use a combination of [SSG (Static Site Generation)](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support) and [ISR (Incremental Static Regeneration)](https://nextjs.org/blog/next-9-5#stable-incremental-static-regeneration). The data (tweets) are fetched directly from the DB using [Prisma](https://www.prisma.io/) in the `getStaticProps` methods. As for the components, we use the [ChakraUI](https://chakra-ui.com/) library.

### Animations
We use a moderately heavy amount of animations. 😍 We use the [react-spring](https://www.react-spring.io/). This library makes creating good looking animations a breeze. Nonetheless, it is not mainly targeted for SVG animations so there is a good amount of custom (and somewhat confusing 🙃) logic.
If you are curious, you can [check out my YouTube channel](https://www.youtube.com/channel/UCE7h4of6ywpAG87KXHV6UrQ) to learn more about it.

### Fetching tweets
Tweets are scheduled to be fetched every hour by a CRON script on [Heroku](https://www.heroku.com/). The script fetches the tweets from Twitter API and puts the new ones/updates the existing ones to the Postgres database using [Prisma](https://www.prisma.io/) query builder. After this is done, the script calls a Vercel webhook which triggers a new app build with the fresh data. 🌿
To build the script (from TS to JS), use the `yarn backend:build-script` command. To run the (built) script, run the `yarn backend:run-script` command.

### TypeScript
We use TypeScript. We try to find a healthy balance between having in 100% type-safe 🔒 and spending too much time ⏳ sweating about weird TypeScript errors. (That's my excuse for my lack of TypeScript knowledge, haha. 🙈)

### Testing
We have a similar approach to testing as to using TypeScript—trying to find a healthy balance between having a 100% test coverage and spending twice as much time writing tests rather than coding. Nevertheless, the frontend app (*unlike* the backend) is **not tested** 🙀 at the moment. This is definitely something to work on!
