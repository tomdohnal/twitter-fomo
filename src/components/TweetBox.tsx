import React from 'react';
import { Box, Flex, Image, Text, useTheme, HStack } from '@chakra-ui/core';
import {
  TwitterFavoriteIcon,
  TwitterLogoIcon,
  TwitterReplyIcon,
  TwitterRetweetIcon,
} from './Icons';

interface Props {
  accountName: string;
  accountScreenName: string;
  profileImageUrl: string;
  favoritesCount: number;
  retweetsCount: number;
  text: string;
  publishedAt: string;
  id: number;
}

// use "dangerously set inner HTML" to render &amp; and other stuff
const TweetBox: React.FC<Props> = ({
  accountName,
  accountScreenName,
  profileImageUrl,
  favoritesCount,
  retweetsCount,
  text,
  publishedAt,
  id,
}) => {
  const theme = useTheme();

  return (
    <Box
      borderWidth={2}
      borderColor="gray.900"
      boxShadow={theme.shadows.sm()}
      bg="white"
      // maxW="600px"
      p={6}
    >
      <Flex>
        <Image w={12} h={12} src={profileImageUrl} alt={`${accountName} profile image`} mr={4} />
        <Flex direction="column">
          <Text fontSize="xl" fontWeight="bold">
            {accountName}
          </Text>
          <Text color="textSecondary" fontSize="sm">
            @{accountScreenName}
          </Text>
        </Flex>
        <Text ml="auto" color="textSecondary">
          {new Date(publishedAt).toLocaleDateString('en')}
        </Text>
      </Flex>
      <Box mt={4}>
        <Text fontSize="lg">{text}</Text>
      </Box>
      <Flex justify="space-between" color="textSecondary" mt={4}>
        <Flex align="center">
          <TwitterFavoriteIcon boxSize={5} mr={2} />
          <Text>{favoritesCount.toLocaleString('en')}</Text>
        </Flex>
        <Flex align="center">
          <TwitterRetweetIcon boxSize={5} mr={2} />
          <Text>{retweetsCount.toLocaleString('en')}</Text>
        </Flex>
        <Flex align="center">
          <TwitterReplyIcon boxSize={5} mr={2} />
        </Flex>
        <Flex align="center">
          <TwitterLogoIcon color="twitter" boxSize={8} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default TweetBox;
