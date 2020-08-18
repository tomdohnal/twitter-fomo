import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';
import {
  TwitterFavoriteIcon,
  TwitterLogoIcon,
  TwitterReplyIcon,
  TwitterRetweetIcon,
} from './Icons';

interface Props {
  accountName: string;
  accountUrlName: string;
  profileImageUrl: string;
  favoritesCount: number;
  retweetsCount: number;
  text: string;
  createdAt: string;
}

const TweetBox: React.FC<Props> = ({
  accountName,
  accountUrlName,
  profileImageUrl,
  favoritesCount,
  retweetsCount,
  text,
  createdAt,
}) => {
  return (
    <Box borderWidth={4} borderColor="gray.900" boxShadow="lg" bg="white" w={['lg']} p={[6]}>
      <Flex>
        <Image w={12} h={12} src={profileImageUrl} alt={`${accountName} profile image`} mr={4} />
        <Flex direction="column">
          <Text fontSize="xl" fontWeight="bold">
            {accountName}
          </Text>
          <Text color="textSecondary" fontSize="sm">
            @{accountUrlName}
          </Text>
        </Flex>
      </Flex>
      <Box mt={4}>
        <Text color="textSecondary">{text}</Text>
      </Box>
      <Flex color="textSecondary" mt={4}>
        <Flex align="center" mr={4}>
          <TwitterFavoriteIcon boxSize={5} mr={1} />
          <Text>{favoritesCount}</Text>
        </Flex>
        <Flex align="center" mr={4}>
          <TwitterRetweetIcon boxSize={5} mr={1} />
          <Text>{retweetsCount}</Text>
        </Flex>
        <Flex align="center" mr={4}>
          <TwitterReplyIcon boxSize={5} mr={1} />
          <Text>{retweetsCount}</Text>
        </Flex>
        <Flex ml="auto" align="center">
          <TwitterLogoIcon boxSize={8} />
          <Text>{new Date(createdAt).toLocaleDateString('en-US')}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TweetBox;
