import React, { ReactElement } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { Box, Heading, Flex, Stack, HStack, VStack, Text, Spacer } from '@chakra-ui/core';
import { NextSeo } from 'next-seo';

import TweetBox from '../../components/TweetBox';
import prisma from '../../prisma';
import ListFilters from '../../components/ListFilters';
import Section from '../../components/Section';
import Container from '../../components/Container';
import { FAQ_ITEMS } from '../../constants';
import { decode, urlFiltersToWhereInput } from '../../filters';
import Footer from '../../components/Footer';
import FAQImage from '../../components/FAQImage';

export const getServerSideProps = async (ctx: unknown) => {
  // @ts-ignore
  const urlFilters = decode(ctx.params.filters);
  const where = urlFiltersToWhereInput(urlFilters);

  const tweets = await prisma.tweet.findMany({
    where,
    select: {
      id: true,
      accountName: true,
      favoritesCount: true,
      retweetsCount: true,
      text: true,
      publishedAt: true,
      accountProfileImageUrl: true,
      accountScreenName: true,
    },
    orderBy: {
      favoritesCount: 'desc',
    },
    take: 10,
  });

  return {
    props: {
      tweets: tweets.map(tweet => ({
        ...tweet,
        publishedAt: tweet.publishedAt.toDateString(),
      })),
    },
  };
};

const LeaderBoard: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  tweets,
}) => {
  return (
    <>
      {tweets.map(tweet => {
        return (
          <TweetBox
            key={tweet.id}
            id={tweet.id}
            text={tweet.text}
            accountName={tweet.accountName}
            publishedAt={tweet.publishedAt}
            favoritesCount={tweet.favoritesCount}
            retweetsCount={tweet.retweetsCount}
            profileImageUrl={tweet.accountProfileImageUrl}
            accountScreenName={tweet.accountScreenName}
          />
        );
      })}
    </>
  );
};

// @ts-ignore
LeaderBoard.getLayout = (page: ReactElement): ReactElement => {
  return (
    <>
      <NextSeo
        title="TwitterFOMO — Leaderboard"
        description="A curated list of the best tweet in web development"
      />
      <Section position="relative" bgColor="primaryPalette.50" pt={16} pb={24}>
        <Container>
          <HStack spacing={20} align="flex-start">
            <Box position="sticky" top={16}>
              <ListFilters />
            </Box>
            <Box>
              <Heading size="2xl">Leaderboard</Heading>
              <VStack spacing={6} mt={12}>
                {page}
              </VStack>
            </Box>
          </HStack>
        </Container>
      </Section>
      <Section bgColor="white" py={24}>
        <Container isFullLeft>
          <Flex>
            <Spacer />
            <Box mt="192px">
              <FAQImage />
            </Box>
            <Spacer />
            <Box maxW="640px">
              <Heading size="2xl" mb={12}>
                FAQ
              </Heading>
              <Stack spacing={8}>
                {FAQ_ITEMS.map(({ title, body }, index) => {
                  return (
                    <Box key={index}>
                      <Heading size="lg" mb={2}>
                        {title}
                      </Heading>
                      <Text fontSize="lg" color="textSecondary">
                        {body}
                      </Text>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Flex>
        </Container>
      </Section>
      <Footer />
    </>
  );
};

export default LeaderBoard;
