import React, { memo } from 'react';
import { Flex, Spacer, Box, Heading, Stack, Text } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import FAQImage from './FAQImage';
import { FAQ_ITEMS } from '../constants';

const FAQ: React.FC = memo(function FAQ() {
  return (
    <Section bgColor="white" py={{ base: 12, md: 24 }} id="faq">
      <Container isFullLeft>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Box
            mt={{ md: '192px' }}
            mb={12}
            w={{ base: '64%', md: 'auto' }}
            mx="auto"
            minWidth={{ md: '300px' }}
            pr={{ base: 12, md: 0 }}
          >
            <FAQImage />
          </Box>
          <Box maxW="640px">
            <Heading size="2xl" mb={{ base: 8, md: 12 }}>
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
  );
});

export default FAQ;
