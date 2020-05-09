import React, { useState } from 'react';
import { Box, Flex, Text, Heading, Input, Button, useTheme } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import { MailIcon } from './Icons';
import MailboxImage from './MailboxImage';
import BalloonImage from './BalloonImage';
import Link from './Link';
import { useCreateSubscriber } from '../newsletter';
import { LEADERBOARD_LINK } from '../constants';
import * as gtag from '../gtag';

const WhatAreYouWaitingForSection: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const createSubscriber = useCreateSubscriber();

  return (
    <Section id="newsletter" pt={{ base: 8, lg: 24 }} mb={{ base: 16, lg: 24 }}>
      <Container>
        <Heading textAlign="center" size="5xl">
          So what are you waiting for?
        </Heading>
      </Container>
      <Container isFullRight mt={{ base: 8, lg: 0 }}>
        <Flex direction={{ base: 'column', lg: 'row' }} alignItems={{ lg: 'center' }}>
          <Box maxW={{ lg: '600px' }}>
            <Heading size="2xl">Subscribe to newsletter</Heading>
            <Text mt={{ base: 3, lg: 6 }} maxW="480px" fontSize="lg" color="gray.600">
              Get the top{' '}
              <Text as="span" fontWeight={700}>
                webdev tweets into you inbox every month
              </Text>{' '}
              and keep updated about the newest and hottest frameworks without stress.
            </Text>
            <Flex
              as="form"
              onSubmit={async (e) => {
                e.preventDefault();
                const isSubscribed = await createSubscriber(email);

                gtag.event({
                  action: 'subscribe_click',
                  category: 'Subscription',
                  label: 'what_are_u_waiting_for',
                });

                if (isSubscribed) {
                  setEmail('');
                }
              }}
              mt={{ base: 2, lg: 4 }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Input
                flex={{ lg: 1 }}
                size="xl"
                w={{ lg: '340px' }}
                _focus={{
                  borderColor: 'primary',
                  boxShadow: `inset 0px 0px 0px 2px ${theme.colors.primary}, ${theme.shadows.md()}`,
                }}
                value={email}
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
              />
              <Button
                type="submit"
                mt={{ base: 2, lg: 0 }}
                boxShadow={theme.shadows.md()}
                _hover={{ boxShadow: theme.shadows.md(), bgColor: 'primaryPalette.800' }}
                size="xl"
                leftIcon={<MailIcon />}
              >
                Subscribe
              </Button>
            </Flex>
          </Box>
          <Box pointerEvents="none" flex={1} px={{ xl: 16 }}>
            <MailboxImage />
          </Box>
        </Flex>
      </Container>
      <Container>
        <Flex alignItems="center">
          <Box flex={1} height="2px" bgColor="gray.200" mr={2} mt="2px" />
          <Text color="gray.500">or/and</Text>
          <Box flex={1} height="2px" bgColor="gray.200" ml={2} mt="2px" />
        </Flex>
      </Container>
      <Container isFullLeft mt={{ base: 16, lg: 0 }}>
        <Flex direction={{ base: 'column', lg: 'row' }} alignItems={{ lg: 'center' }}>
          <Box pointerEvents="none" flex={1} px={{ xl: 32 }} order={{ base: 1, lg: 0 }}>
            <BalloonImage />
          </Box>
          <Box maxW={{ lg: '600px' }} order={{ base: 0, lg: 1 }}>
            <Heading size="2xl">View the tweets</Heading>
            <Text mt={{ base: 3, lg: 6 }} maxW="480px" fontSize="lg" color="gray.600">
              Wanna see what’s trending right away? <br />
              <Text as="span" fontWeight={700}>
                Head right into our web app
              </Text>{' '}
              where you can view top tweets about different technologies and apply many filters!{' '}
            </Text>
            <Flex mt={{ base: 2, lg: 4 }} direction={{ base: 'column', lg: 'row' }}>
              <Button
                mt={{ base: 2, lg: 0 }}
                boxShadow={theme.shadows.md()}
                _hover={{ boxShadow: theme.shadows.md(), bgColor: 'primaryPalette.800' }}
                size="xl"
                href={LEADERBOARD_LINK}
                as={Link}
                onClick={() => {
                  gtag.event({
                    action: 'view_top_tweets_click',
                    category: 'LP',
                    label: 'what_are_u_waiting_for',
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
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Section>
  );
};

export default WhatAreYouWaitingForSection;
