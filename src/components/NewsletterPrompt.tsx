import React from 'react';
import { animated, useTransition, config } from 'react-spring';
import { Box, Heading, Text, useTheme, Input, Button, CloseButton, Flex } from '@chakra-ui/core';
import { JSIcon, MailIcon } from './Icons';
import EnvelopeImage from './EnvelopeImage';

const AnimatedBox = animated(Box);

const NewsletterPrompt: React.FC<{ isShown: boolean; hide: () => void }> = ({ isShown, hide }) => {
  // return <Box />;
  // TODO: improve animation
  const transition = useTransition(isShown, {
    from: {
      transform: 'translate3d(0, 110%, 0)',
    },
    enter: {
      transform: 'translate3d(0, 0%, 0)',
    },
    leave: {
      transform: 'translate3d(0, 110%, 0)',
    },
    // config: config.,
  });
  const theme = useTheme();

  return transition(
    (style, item) =>
      item && (
        <AnimatedBox
          bgColor="#fff"
          zIndex={1}
          maxW="440px"
          position="fixed"
          bottom={{ lg: 2 }}
          left={{ lg: 2 }}
          px={{ base: 2, lg: 4 }}
          py={{ base: 2, lg: 6 }}
          border="2px solid"
          borderColor="primary"
          boxShadow={theme.shadows.md(theme.colors.primaryPalette['100'])}
          style={style}
        >
          <CloseButton pos="absolute" right={4} top={4} size="lg" onClick={hide} />
          <Heading size="xl">
            Never miss a <JSIcon /> framework release again!
          </Heading>
          <Box pl={{ lg: 16 }} mt={{ lg: -12 }}>
            <EnvelopeImage baseDelay={1000} />
          </Box>
          <Text mt={{ lg: 4 }} display="block" maxW="440px" mx="auto" color="textSecondary">
            <Text fontWeight={700} as="span">
              Join the newsletter
            </Text>
            , get the top webdev tweets every month, and put an end to the endless scrolling through
            Twitter hoping (not) to discover yet another spicy library.
          </Text>
          <Flex mt={{ lg: 4 }}>
            <Input
              flex={{ lg: 1 }}
              _focus={{
                borderColor: 'primary',
                boxShadow: `inset 0px 0px 0px 1px ${theme.colors.primary}, ${theme.shadows.sm()}`,
              }}
            />
            <Button
              mt={{ base: 2, lg: 0 }}
              boxShadow={theme.shadows.sm()}
              _hover={{ boxShadow: theme.shadows.sm(), bgColor: 'primaryPalette.800' }}
            >
              Subscribe
            </Button>
          </Flex>
        </AnimatedBox>
      ),
  );
};

export default NewsletterPrompt;
