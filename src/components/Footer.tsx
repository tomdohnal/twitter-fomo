import React from 'react';
import { Heading, Text, Image, Box, Button, HStack } from '@chakra-ui/core';
import Section from './Section';
import Container from './Container';
import { TwitterLogoIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <Section bgColor="primaryPalette.800" py={32}>
      <Container>
        <Heading size="3xl" color="primaryPalette.50" textAlign="center">
          Who’s behind TwitterFOMO?
        </Heading>
        <HStack spacing={16} px={20} mt={16}>
          <Image src="/images/me.png" alt="TwitterFOMO author" flexShrink={0} />
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
            >
              Follow
            </Button>
          </Box>
        </HStack>
      </Container>
    </Section>
  );
};

export default Footer;
