import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import { CheckIcon, CrossIcon } from './Icons';
import CellPhoneImage from './CellPhoneImage';
import TabletImage from './TabletImage';

const ProblemSolutionSection: React.FC = () => {
  return (
    <Section bgColor="primaryPalette.100" pt={{ base: 16, lg: 0 }} pb={{ base: 16, lg: 32 }}>
      <Container id="problem" isFullRight>
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box>
            <Heading size="3xl">The problem</Heading>
            <Box maxW="480px" fontSize="lg" color="gray.700">
              <Text mt={{ lg: 3 }}>
                You&apos;re squandering time on Twitter. New (blazing-fast) libraries, hot 🔥 and
                spicy tips, and motivational quotes. You crave those dopamine snacks. And you feel
                like you *need* to keep scrolling through that fricking Twitter feed so that you
                don&apos;t miss anything important. FOMO 😨. FOMO at its finest.
              </Text>
              <br />
              <Text>
                <CrossIcon boxSize={8} ml={-2} />
                You&apos;re squandering precious time ⏳
              </Text>
              <Text>
                <CrossIcon boxSize={8} ml={-2} />
                You keep taking dopamine hits 💉
              </Text>
              <Text>
                <CrossIcon boxSize={8} ml={-2} />
                You&apos;re suffering from FOMO 🙀
              </Text>
            </Box>
          </Box>
          <Box
            pointerEvents="none"
            flex={1}
            ml={{ lg: 16 }}
            px={{ xl: 32 }}
            mt={{ base: 16, lg: 0 }}
          >
            <CellPhoneImage />
          </Box>
        </Flex>
      </Container>
      <Container id="solution" mt={{ base: 16, lg: 32 }} isFullLeft>
        <Flex direction={{ base: 'column', lg: 'row' }}>
          <Box
            pointerEvents="none"
            flex={1}
            px={{ xl: 32 }}
            mt={{ base: 16, lg: 0 }}
            order={{ base: 1, lg: 0 }}
          >
            <TabletImage />
          </Box>
          <Box pl={{ xl: 32 }}>
            <Heading size="3xl">This solution</Heading>
            <Box maxW="480px" fontSize="lg" color="gray.700">
              <Text mt={{ lg: 3 }}>
                I&apos;mma be honest with you. I won&apos;t over-promise and under-deliver. You will
                still be addicted to Twitter as a TwitterFOMO user and subscriber 📧. The FOMO will
                NOT fully go away. However, you will have enough confidence that you won&apos;t miss
                anything important so that scrolling 📱 through that fricking Twitter feed will NOT
                be the last thing you do before you go to sleep 🛌 and the first after you wake up
                ☀️.
              </Text>
              <br />
              <Text h={8}>
                <CheckIcon boxSize={6} mr={2} />
                You lower your Twitter addiction 📵
              </Text>
              <Text h={8}>
                <CheckIcon boxSize={6} mr={2} />
                Your FOMO will become less severe 😌
              </Text>
              <Text h={8}>
                <CheckIcon boxSize={6} mr={2} />
                No more scrolling in the bed 💤
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
