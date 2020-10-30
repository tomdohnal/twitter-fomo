import { Box, Heading, Stack } from '@chakra-ui/core';
import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Container, { CONTAINER_PX } from '../../components/Container';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';
import ListFilters from '../../components/ListFilters';
import Section from '../../components/Section';
import TweetBox from '../../components/TweetBox';
import TweetBoxActions from '../../components/TweetBoxActions';
import TweetBoxContent from '../../components/TweetBoxContent';
import TweetBoxHeader from '../../components/TweetBoxHeader';
import { DEFAULT_FILTER } from '../../constants';
import { get as getTweets } from '../../controllers/tweets';
import { decode, encode, Filters } from '../../filters';

export const getStaticPaths = () => {
  return {
    paths: [{ params: { filters: DEFAULT_FILTER } }],
    fallback: true,
  };
};

export const getStaticProps = async (ctx: unknown) => {
  // @ts-ignore
  const tweets = await getTweets(ctx.params.filters);

  return {
    props: {
      initialTweets: tweets,
    },
    revalidate: 1800, // half an hour
  };
};

const LeaderBoard: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialTweets,
}) => {
  const router = useRouter();

  // @ts-ignore
  const [filters, setFilters] = useState<Filters>(decode(router.query.filters || DEFAULT_FILTER));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(
      `/leaderboard/[filters]`,
      // @ts-ignore
      `/leaderboard/${encode(filters)}`,
    );
  }, [filters]);

  const tweets = initialTweets;

  return (
    <>
      <NextSeo
        title="TwitterFOMO ⭐️ Top Tweets"
        description="TwitterFOMO—A curated list of the best tweets in web development"
      />
      <Section position="relative" bgColor="primaryPalette.50" pt={{ base: 0, md: 16 }} pb={24}>
        <Box
          px={CONTAINER_PX}
          display={{ md: 'none' }}
          mt={{ base: 3, md: 4 }}
          pb={{ md: 3 }}
          bgColor="white"
        >
          <Heading size="2xl">Top Tweets</Heading>
        </Box>
        <Container>
          <Stack spacing={{ md: 8, lg: 20 }} direction={{ base: 'column', md: 'row' }}>
            <Box
              position="sticky"
              zIndex={1}
              top={{ base: 0, md: 16 }}
              flexBasis={{ md: '240px', lg: '300px' }}
              flexShrink={0}
              height="fit-content"
            >
              <ListFilters filters={filters} setFilters={setFilters} />
            </Box>
            <Box>
              <Heading display={{ base: 'none', md: 'block' }} size="2xl">
                Top Tweets
              </Heading>
              <Stack maxW="600px" direction="column" spacing={6} mt={{ base: 6, md: 12 }}>
                {router.isFallback
                  ? null
                  : tweets.map(tweet => {
                      return (
                        <TweetBox
                          key={tweet.id}
                          href={`https://twitter.com/${tweet.payload.user.screen_name}/status/${tweet.payload.id_str}`}
                          header={
                            <TweetBoxHeader
                              created_at={tweet.publishedAt}
                              imageUrl={tweet.payload.user.profile_image_url_https}
                              name={tweet.payload.user.name}
                              screenName={tweet.payload.user.screen_name}
                            />
                          }
                          content={<TweetBoxContent tweet={tweet.payload} />}
                          actions={
                            <TweetBoxActions
                              favorite_count={tweet.favoritesCount}
                              retweet_count={tweet.retweetsCount}
                              tweetId={tweet.payload.id_str}
                            />
                          }
                        />
                      );
                    })}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Section>
      <FAQ heading="FAQ" bgColor="#fff" />
      <Footer />
    </>
  );
};

export default LeaderBoard;
