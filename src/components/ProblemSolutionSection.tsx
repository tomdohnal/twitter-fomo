import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import { CheckIcon, CrossIcon } from './Icons';
import CellPhoneImage from './CellPhoneImage';

const ProblemSolutionSection: React.FC = () => {
  return (
    <Section bgColor="primaryPalette.100" id="home" pt={{ base: 4, md: 8 }}>
      <Container isFullLeft>
        <Flex>
          <Box flex={1}>
            <CellPhoneImage />
          </Box>
          <Box>
            <Heading>The problem</Heading>
            <Box maxW="400px">
              <Text>
                Amet dignissim velit at porta consequat eget integer malesuada. Massa sed fusce sed
                facilisi. Sed posuere amet semper leo a viverra etiam.
              </Text>
              <br />
              <Text>
                <CrossIcon boxSize={8} ml={-2} />
                Massa sed fusce sed facilisi
              </Text>
              <Text>
                <CrossIcon boxSize={8} ml={-2} />
                Massa sed fusce sed facilisi
              </Text>
              <Text>
                <CrossIcon boxSize={8} ml={-2} />
                Massa sed fusce sed facilisi
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
      <Container isFullRight>
        <Flex>
          <Box>
            <Heading>The solution</Heading>
            <Box maxW="400px">
              <Text>
                Amet dignissim velit at porta consequat eget integer malesuada. Massa sed fusce sed
                facilisi. Sed posuere amet semper leo a viverra etiam.
              </Text>
              <br />
              <Text h={8}>
                <CheckIcon boxSize={6} mr={2} />
                Massa sed fusce sed facilisi
              </Text>
              <Text h={8}>
                <CheckIcon boxSize={6} mr={2} />
                Massa sed fusce sed facilisi
              </Text>
              <Text h={8}>
                <CheckIcon boxSize={6} mr={2} />
                Massa sed fusce sed facilisi
              </Text>
            </Box>
          </Box>
          <Box></Box>
        </Flex>
      </Container>
    </Section>
  );
};

export default ProblemSolutionSection;
