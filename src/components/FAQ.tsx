import React, { memo } from 'react';
import { Flex, Box, Heading, Stack, Text } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import FAQImage from './FAQImage';
import { FAQ_ITEMS } from '../constants';

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
