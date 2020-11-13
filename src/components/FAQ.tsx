import React, { memo } from 'react';
import { Flex, Box, Heading, Stack, Text } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import FAQImage from './FAQImage';
import Link from './Link';

export const FAQ_ITEMS = [
  {
    title: 'Is TwitterFOMO open-source?',
    body: (
      <>
        Yes! You can view it and be amazed by the most clean code ever on{' '}
        <Link
          fontWeight="700"
          color="primary"
          href="https://github.com/tomdohnal/twitter-fomo"
          isExternal
        >
          github.com/tomdohnal/twitter-fomo
        </Link>
        . (I kindly ask you to give it a star. 🙃)
      </>
    ),
  },
  {
    title: 'How did you make those animated SVGs?',
    body: (
      <>
        Using react-spring! And a bit of magic. I started making videos about those on{' '}
        <Link
          fontWeight="700"
          color="primary"
          href="https://www.youtube.com/channel/UCE7h4of6ywpAG87KXHV6UrQ"
          isExternal
        >
          my YouTube channel
        </Link>
        . I kindly ask you to ABSOLUTELY BEAT THE HELL OUT OF THE SUBSCRIBE BUTTON!!! (You
        don&apos;t have to, lol.)
      </>
    ),
  },
  {
    title: 'How are the top tweets curated?',
    body:
      'The tweets are gathered from a handpicked list of accounts tweeting about "webdev" from which we’re selected the most liked ones.',
  },
  {
    title: 'How does the newsletter work?',
    body:
      "Currently, we’re sending the newsletter on a monthly basis and it includes the most liked tweets in a month. However, I'm considering creating a tailor-made newsletter which you’ll have the option to get weekly and also filter out only the types of tweets you’d like to get.",
  },
  {
    title: 'How to filter out “off-topic” tweets?',
    body:
      "I get it. You want to read what’s new in webdev and you’re shown a picture of cute little kittens instead. (Nothing against posting these on Twitter, of course!) Currently, the only thing that might help is to filter the tweets according to their types (e. g. show only text tweets). But I am considering a more sophisticated system to only show relevant tweets in the future! I'd love to hear your thoughts!",
  },
  {
    title: 'I saw a popular tweet on Twitter but it’s not showing up here!!?!?? 😡🤬🤯',
    body:
      'Yes, that can happen. The list of the accounts whose tweets are traversed is limited (and handpicked) and although I tried hard not to miss any “big” accounts I still might have missed them. Or there simply could have been a popular tweet from a “small” account which are not in the DB. You can DM me on Twitter to fix this!',
  },
  {
    title: 'What tech stack does TwitterFOMO use?',
    body:
      'ALL THE BUZZWORDS!!! React.js, ChakraUI, Next.js, Prisma, Vercel and I’m just scratching the surface.',
  },
];

const FAQ: React.FC<{
  heading: string;
  bgColor: string;
}> = memo(function FAQ({ heading, bgColor }) {
  return (
    <Section bgColor={bgColor} py={{ base: 12, md: 24 }} id="faq">
      <Container isFullLeft>
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box
            pointerEvents="none"
            mt={{ md: '192px' }}
            mb={12}
            flex={1}
            px={{ xl: 16 }}
            order={{ base: 1, lg: 0 }}
          >
            <FAQImage />
          </Box>
          <Box maxW="600px" order={{ base: 0, lg: 1 }}>
            <Heading size="3xl" mb={{ base: 8, md: 12 }}>
              {heading}
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
  );
});

export default FAQ;
