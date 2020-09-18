import React, { memo } from 'react';
import { Flex, Spacer, Box, Heading, Stack, Text } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import FAQImage from './FAQImage';
import { FAQ_ITEMS } from '../constants';

const FAQ: React.FC = memo(() => {
  return (
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
  );
});

export default FAQ;
