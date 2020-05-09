import React from 'react';
import { Heading, Text, Img, Box, Button, Stack, Link } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import { GithubLogoIcon, TwitterLogoIcon, YouTubeLogoIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <Section bgColor="primaryPalette.800" py={{ base: 16, md: 32 }} id="about">
      <Container>
        <Heading size="3xl" color="primaryPalette.50" textAlign="center">
          Who’s behind TwitterFOMO?
        </Heading>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 6, md: 16 }}
          px={{ base: 8, md: 20 }}
          mt={{ base: 6, md: 16 }}
        >
          <Img
            src="/images/me.png"
            alt="TwitterFOMO author"
            flexShrink={0}
            w={{ base: '192px', md: '256px' }}
            mx="auto"
          />
          <Box>
            <Text color="primaryPalette.50" fontSize="lg" mb={4}>
              I was sick and tired of wasting countless hours mindlessly scrolling through Twitter
              hoping to get a dopamine hit by seeing yet another new framework, hot tip 🔥, or a
              motivational quote. So I decided to indulge in over-engineering and premature
              optimization instead and created this tool 🛠.
            </Text>
            <Stack spacing={4} direction={{ base: 'column', lg: 'row' }}>
              <Button
                variant="solidLight"
                colorScheme="primaryPalette"
                leftIcon={<TwitterLogoIcon h={6} w={6} />}
                w={{ base: '100%', md: 'auto' }}
                as={Link}
                isExternal
                href="https://twitter.com/intent/follow?screen_name=tom_dohnal"
              >
                Follow
              </Button>
              <Button
                variant="solidLight"
                colorScheme="primaryPalette"
                leftIcon={<GithubLogoIcon h={6} w={6} />}
                w={{ base: '100%', md: 'auto' }}
                as={Link}
                isExternal
                href="https://github.com/tomdohnal/twitter-fomo"
              >
                View source
              </Button>
              <Button
                variant="solidLight"
                colorScheme="primaryPalette"
                leftIcon={<YouTubeLogoIcon h={6} w={6} />}
                w={{ base: '100%', md: 'auto' }}
                as={Link}
                isExternal
                href="https://www.youtube.com/channel/UCE7h4of6ywpAG87KXHV6UrQ"
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Section>
  );
};

export default Footer;
