import React from 'react';
import { Heading, Text, Image, Box, Button, Stack } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import { TwitterLogoIcon } from './Icons';

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
          <Image
            src="/images/me.png"
            alt="TwitterFOMO author"
            flexShrink={0}
            w={{ base: '192px', md: '256px' }}
            mx="auto"
          />
          <Box>
            <Text color="primaryPalette.50" fontSize="lg" mb={4}>
              Donec fermentum in a habitasse mattis urna, justo, integer vitae. Tellus in dignissim
              egestas egestas libero purus, venenatis enim. Nunc amet, sed ac sed. Tincidunt orci,
              sed pulvinar sollicitudin eget mi congue.
            </Text>
            <Button
              variant="solidLight"
              colorScheme="primaryPalette"
              leftIcon={<TwitterLogoIcon h={6} w={6} />}
              w={{ base: '100%', md: 'auto' }}
            >
              Follow
            </Button>
          </Box>
        </Stack>
      </Container>
    </Section>
  );
};

export default Footer;
