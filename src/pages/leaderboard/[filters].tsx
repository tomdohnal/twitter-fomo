import React, { useEffect, useRef, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { Box, Heading, Flex, Stack, HStack, VStack, Text, Spacer } from '@chakra-ui/core';
import { NextSeo } from 'next-seo';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import TweetBox from '../../components/TweetBox';
import ListFilters from '../../components/ListFilters';
import Section from '../../components/Section';
import Container, { CONTAINER_PX } from '../../components/Container';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';
import { get as getTweets } from '../../controllers/tweets';
import fetcher from '../../fetcher';
import { Filters, encode, decode } from '../../filters';
import { Response } from '../api/tweets';
import { Media } from '../../media';

export const getServerSideProps = async (ctx: unknown) => {
  // @ts-ignore
  const tweets = await getTweets(ctx.params.filters);

  return {
    props: {
      initialTweets: tweets,
    },
  };
};

const LeaderBoard: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  initialTweets,
}) => {
  const router = useRouter();

  // @ts-ignore
  const [filters, setFilters] = useState<Filters>(decode(router.query.filters));

  useEffect(() => {
    router.replace(
      `/leaderboard/[filters]`,
      // @ts-ignore
      `/leaderboard/${encode(filters)}`,
    );
  }, [filters]);

  // @ts-ignore
  const { data, error } = useSWR<Response>(`tweets?filters=${encode(filters)}`, fetcher);

  const tweets = data || initialTweets;

  if (error) {
    return <>Error ocurred</>;
  }

  return (
    <>
      <NextSeo
        title="TwitterFOMO — Leaderboard"
        description="A curated list of the best tweet in web development"
      />
      <Section position="relative" bgColor="primaryPalette.50" pt={{ base: 0, md: 16 }} pb={24}>
        <Media lessThan="md">
          <Box px={CONTAINER_PX} mt={{ base: 3, md: 4 }} pb={{ md: 3 }} bgColor="white">
            <Heading size="2xl">Top Tweets</Heading>
          </Box>
        </Media>
        <Container>
          <Stack spacing={{ md: 8, lg: 20 }} direction={{ base: 'column', md: 'row' }}>
            <Box
              position="sticky"
              top={{ base: 0, md: 16 }}
              flexBasis={{ md: '240px', lg: '300px' }}
              flexShrink={0}
              height="fit-content"
            >
              <ListFilters filters={filters} setFilters={setFilters} />
            </Box>
            <Box>
              <Media greaterThan="sm">
                <Heading size="2xl">Top Tweets</Heading>
              </Media>
              <Stack direction="column" spacing={6} mt={{ base: 6, md: 12 }}>
                {tweets.map(tweet => {
                  return <TweetBox key={tweet.id} tweet={tweet.payload} />;
                })}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Section>
      <FAQ />
      <Footer />
    </>
  );
};

export default LeaderBoard;
