import { Box, Heading, Stack } from '@chakra-ui/core';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState, Fragment } from 'react';
import Container, { CONTAINER_PX } from '../../components/Container';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';
import ListFilters from '../../components/ListFilters';
import Section from '../../components/Section';
import TweetBox from '../../components/TweetBox';
import TweetBoxActions from '../../components/TweetBoxActions';
import TweetBoxContent from '../../components/TweetBoxContent';
import TweetBoxHeader from '../../components/TweetBoxHeader';
import TweetBoxAd from '../../components/TweetBoxAd';
import { DEFAULT_FILTER } from '../../constants';
import { get as getTweets } from '../../controllers/tweets';
import { decode, encode, Filters } from '../../filters';
import { FullUser, Status } from 'twitter-d';

export const getStaticPaths = () => {
  return {
    paths: [{ params: { filters: DEFAULT_FILTER } }],
    fallback: true,
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext<{ filters: string }>) => {
  const tweets = await getTweets(ctx.params?.filters || DEFAULT_FILTER);

  return {
    props: {
      initialTweets: tweets,
    },
    revalidate: 1800, // half an hour
  };
};

const LeaderBoard: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialTweets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>(
    decode((router.query.filters as string) || DEFAULT_FILTER),
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(`/leaderboard/[filters]`, `/leaderboard/${encode(filters)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const tweets = initialTweets;
  const showAdIndex = tweets ? (tweets.length >= 3 ? 2 : tweets.length - 1) : 0;

  return (
    <>
      <NextSeo
        title="TwitterFOMO ⭐️ Top Tweets"
        description="TwitterFOMO—The best tweets in web development"
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
              zIndex={2}
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
                  : tweets.map((tweet, index) => {
                      const ad = showAdIndex === index ? <TweetBoxAd /> : null;
                      const payload: Status = (tweet.payload as unknown) as Status;
                      const user = payload.user as FullUser;

                      return (
                        <Fragment key={tweet.id}>
                          <TweetBox
                            href={`https://twitter.com/${user.screen_name}/status/${payload.id_str}`}
                            header={
                              <TweetBoxHeader
                                created_at={payload.created_at}
                                imageUrl={user.profile_image_url_https}
                                name={user.name}
                                screenName={user.screen_name}
                              />
                            }
                            content={<TweetBoxContent tweet={payload} />}
                            actions={
                              <TweetBoxActions
                                favorite_count={tweet.favoritesCount}
                                retweet_count={tweet.retweetsCount}
                                tweetId={payload.id_str}
                              />
                            }
                          />
                          {ad}
                        </Fragment>
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
