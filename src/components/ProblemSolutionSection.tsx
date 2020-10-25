import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import { CheckIcon, CrossIcon } from './Icons';
import CellPhoneImage from './CellPhoneImage';
import TabletImage from './TabletImage';

const ProblemSolutionSection: React.FC = () => {
  return (
    <Section
      bgColor="primaryPalette.100"
      id="home"
      pt={{ base: 16, lg: 0 }}
      pb={{ base: 16, lg: 32 }}
    >
      <Container isFullRight>
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box>
            <Heading size="3xl">The problem</Heading>
            <Box maxW="480px" fontSize="lg" color="gray.700">
              <Text mt={{ lg: 3 }}>
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
          <Box flex={1} ml={{ lg: 16 }} px={{ xl: 32 }} mt={{ base: 16, lg: 0 }}>
            <CellPhoneImage />
          </Box>
        </Flex>
      </Container>
      <Container mt={{ base: 16, lg: 32 }} isFullLeft>
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box flex={1} px={{ xl: 32 }} mt={{ base: 16, lg: 0 }} order={{ base: 1, lg: 0 }}>
            <TabletImage />
          </Box>
          <Box pl={{ xl: 32 }}>
            <Heading size="3xl">This solution</Heading>
            <Box maxW="480px" fontSize="lg" color="gray.700">
              <Text mt={{ lg: 3 }}>
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
