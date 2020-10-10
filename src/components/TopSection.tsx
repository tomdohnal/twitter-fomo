import { Heading, Text } from '@chakra-ui/core';
import React from 'react';
import Container from './Container';
import Section from './Section';

const TopSection: React.FC<{
  tweets: {}[];
}> = ({ tweets }) => {
  return (
    <Section id="home" pt={{ base: 4, md: 20 }}>
      <Container>
        <Heading as="h1" fontSize={{ base: '48px', md: '96px' }} color="primary">
          Top webdev tweets
        </Heading>
        <Heading size="3xl">
          No{' '}
          <Text as="span" fontStyle="italic">
            mindless
          </Text>{' '}
          scrolling
        </Heading>
      </Container>
    </Section>
  );
};

export default TopSection;
