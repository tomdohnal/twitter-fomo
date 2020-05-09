import { Heading, Text, Box, Button, useTheme, Stack } from '@chakra-ui/core';
import React from 'react';
import Container from './Container';
import Section from './Section';
import TweetBoxCropped from './TweetBoxCropped';
import TweetBoxActions from './TweetBoxActions';
import TweetBoxContent from './TweetBoxContent';
import TweetBoxTrophyHeader from './TweetBoxTrophyHeader';
import Link from './Link';
import MountainImage from './MountainImage';
import { LEADERBOARD_LINK } from '../constants';
import * as gtag from '../gtag';
import { FullUser, Status } from 'twitter-d';

const TopSection: React.FC<{
  tweets: {
    publishedAt: string;
    text: string;
    id: number;
    accountName: string;
    favoritesCount: number;
    retweetsCount: number;
    accountProfileImageUrl: string;
    accountScreenName: string;
    payload: Status;
  }[];
}> = ({ tweets }) => {
  const theme = useTheme();

  return (
    <Section id="home" pt={{ base: 4, md: 8 }} overflow="hidden" pb="96px">
      <Container isFullRight>
        <Heading as="h1" size="6xl" color="primary">
          Top webdev tweets
        </Heading>
        <Heading display={{ base: 'none', md: 'inline' }} size="3xl">
          No{' '}
          <Text as="span" fontStyle="italic">
            mindless
          </Text>{' '}
          scrolling
        </Heading>
        <Stack pos="relative" direction={{ base: 'column', lg: 'row' }} alignItems="center">
          <Box maxW={{ lg: '480px', xl: '512px' }} mt={{ base: '24px', md: '32px', lg: '64px' }}>
            <Text
              mb={{ base: 1, md: '8px' }}
              fontWeight={800}
              color="gray.500"
              fontSize={{ base: '14px', md: '16px' }}
            >
              Top tweets this week
            </Text>
            <Box
              maxH="768px"
              overflow={{ base: 'hidden', lg: 'scroll' }}
              pos="relative"
              borderTop="2px solid"
              borderColor="text"
            >
              {tweets.map((tweet, index) => (
                <TweetBoxCropped
                  key={tweet.id}
                  href={`https://twitter.com/${
                    (tweet.payload.user as FullUser).screen_name
                  }/status/${tweet.payload.id_str}`}
                  header={
                    <TweetBoxTrophyHeader
                      created_at={tweet.payload.created_at}
                      imageUrl={(tweet.payload.user as FullUser).profile_image_url_https}
                      name={(tweet.payload.user as FullUser).name}
                      screenName={(tweet.payload.user as FullUser).screen_name}
                      order={(index + 1) as 1 | 2 | 3}
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
              ))}
            </Box>
            <Box
              bg="primaryPalette.200"
              position="absolute"
              top="64px"
              left="-1000px"
              right="-1000px"
              height="754px"
              display={{ lg: 'none' }}
              zIndex={-1}
            />
            <Button
              boxShadow={theme.shadows.sm()}
              _hover={{ boxShadow: theme.shadows.sm(), bgColor: 'primaryPalette.800' }}
              as={Link}
              href={LEADERBOARD_LINK}
              w="100%"
              height={{ base: '64px', lg: '48px' }}
              fontSize={{ base: '20px', lg: '16px' }}
              pos="relative"
              _after={{
                content: '""',
                pos: 'absolute',
                display: 'block',
                h: '16px',
                top: '-16px',
                left: '2px',
                right: '2px',
                background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4))',
              }}
              onClick={() => {
                gtag.event({
                  action: 'view_top_tweets_click',
                  category: 'LP',
                  label: 'hero_mobile',
                });
              }}
            >
              View top tweets
            </Button>

            <Text
              mt={2}
              textAlign="center"
              fontSize="xs"
              color="gray.500"
              textTransform="lowercase"
              fontWeight={400}
              display={{ lg: 'none' }}
            >
              No sign-up required
            </Text>
          </Box>
          <Box
            alignSelf={{ base: 'stretch', lg: 'flex-start' }}
            display="flex"
            flex={1}
            flexDirection="column"
            pt={{ base: '64px', xl: 0 }}
          >
            <Box transform={{ base: 'scale(1.4) translateX(-32px)' }} pointerEvents="none">
              <MountainImage />
            </Box>
            <Box
              display={{ base: 'none', lg: 'block' }}
              mt={{ base: 32 }}
              ml={{ md: 'calc(8vw - 12px)' }}
              alignSelf={{ base: 'center', lg: 'flex-start' }}
            >
              <Button
                as={Link}
                href={LEADERBOARD_LINK}
                size="xl"
                pos="relative"
                onClick={() => {
                  throw new Error();
                  gtag.event({
                    action: 'view_top_tweets_click',
                    category: 'LP',
                    label: 'hero_desktop',
                  });
                }}
              >
                View top tweets
                <Box
                  bg="primaryPalette.100"
                  position="absolute"
                  top="128px"
                  left="-3000px"
                  right="-3000px"
                  height="754px"
                  display={{ base: 'none', lg: 'block' }}
                  zIndex={-1}
                />
              </Button>
              <Text
                mt={1}
                fontSize="sm"
                color="gray.500"
                textTransform="lowercase"
                fontWeight={400}
                textAlign="center"
              >
                No sign-up required
              </Text>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Section>
  );
};

export default TopSection;
