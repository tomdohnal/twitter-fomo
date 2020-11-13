import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import {
  Box,
  Heading,
  Text,
  useTheme,
  Input,
  Button,
  CloseButton,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/core';
import { JSIcon } from './Icons';
import EnvelopeImage from './EnvelopeImage';
import { SCROLL_DIRECTIONS, useScrollInfo } from '../utils';
import { useCreateSubscriber } from '../newsletter';
import * as gtag from '../gtag';

const AnimatedBox = animated(Box);

const NewsletterPrompt: React.FC = () => {
  const { isLastFold, isBelowFirstFold, scrollDirection } = useScrollInfo();
  const isBelowLg = useBreakpointValue({ base: true, lg: false });
  const [isShown, setIsShown] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const showDesktop = isLastFold && isBelowLg === false;
    const showMobile =
      isBelowFirstFold && scrollDirection === SCROLL_DIRECTIONS.DOWN && isBelowLg === true;

    if ((showMobile || showDesktop) && !window.localStorage.getItem('IS_SUBSCRIBED') && !isShown) {
      setIsShown(true);
    }

    if (scrollDirection !== SCROLL_DIRECTIONS.DOWN && !email && isBelowLg === true) {
      setIsShown(false);
    }
  }, [email, isBelowFirstFold, isBelowLg, isLastFold, isShown, scrollDirection]);

  const transition = useTransition(isShown && !isClosed, {
    from: {
      transform: 'translate3d(0, 110%, 0)',
    },
    enter: {
      transform: 'translate3d(0, 0%, 0)',
    },
    leave: {
      transform: 'translate3d(0, 110%, 0)',
    },
  });

  const createSubscriber = useCreateSubscriber();

  const theme = useTheme();

  return transition(
    (style: any, item: boolean) =>
      item && (
        <AnimatedBox
          bgColor="#fff"
          zIndex={1}
          maxW={{ lg: '440px' }}
          position="fixed"
          bottom={{ lg: 2 }}
          left={{ base: 0, lg: 2 }}
          right={{ base: 0, lg: null }}
          px={{ base: 2, lg: 4 }}
          py={{ base: 2, lg: 6 }}
          border="2px solid"
          borderColor="primary"
          boxShadow={theme.shadows.md(theme.colors.primaryPalette['100'])}
          style={style}
        >
          <CloseButton
            pos="absolute"
            right={{ base: 0, lg: 4 }}
            top={{ base: 0, lg: 4 }}
            size="lg"
            onClick={() => {
              setIsClosed(true);
            }}
          />
          <Heading display={{ base: 'none', lg: 'inline' }} size="xl">
            Never miss a <JSIcon /> framework release again!
          </Heading>
          <Heading display={{ lg: 'none' }} size="xl">
            Join the newsletter
          </Heading>
          <Box display={{ base: 'none', lg: 'block' }} pl={{ lg: 16 }} mt={{ lg: -12 }}>
            <EnvelopeImage baseDelay={1000} />
          </Box>
          <Text
            display={{ base: 'none', lg: 'block' }}
            mt={{ lg: 4 }}
            maxW="440px"
            mx="auto"
            color="textSecondary"
          >
            <Text fontWeight={700} as="span">
              Join the newsletter
            </Text>
            , get the top webdev tweets every month, and put an end to the endless scrolling through
            Twitter hoping (not) to discover yet another spicy library.
          </Text>
          <Flex
            as="form"
            onSubmit={async (e) => {
              e.preventDefault();
              const isSubscribed = await createSubscriber(email);

              gtag.event({
                action: 'subscribe_click',
                category: 'Subscription',
                label: 'newsletter_prompt',
              });

              if (isSubscribed) {
                setIsClosed(true);
              }
            }}
            mt={{ base: 2, lg: 4 }}
          >
            <Input
              flex={{ lg: 1 }}
              _focus={{
                borderColor: 'primary',
                boxShadow: `inset 0px 0px 0px 1px ${theme.colors.primary}, ${theme.shadows.sm()}`,
              }}
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
              }}
            />
            <Button
              flexShrink={0}
              boxShadow={theme.shadows.sm()}
              _hover={{ boxShadow: theme.shadows.sm(), bgColor: 'primaryPalette.800' }}
              type="submit"
            >
              Subscribe
            </Button>
          </Flex>
        </AnimatedBox>
      ),
  );
};

export default NewsletterPrompt;
