import { Flex, useTheme, Text, Box } from '@chakra-ui/core';
import { stringType } from 'aws-sdk/clients/iam';
import React, { useState, memo } from 'react';
import { useSpring, animated, config } from 'react-spring';
import {
  TwitterFavoriteIcon,
  TwitterLogoIcon,
  TwitterReplyIcon,
  TwitterRetweetIcon,
} from './Icons';

const AnimatedBox = animated(Box);

const TwitterActionButton: React.FC<{
  tweetId: string;
  Icon: React.ComponentType;
  link: string;
}> = ({ tweetId, Icon, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const animatedValues = useSpring({
    color: isHovered ? theme.colors.twitter : theme.colors.textSecondary,
    config: config.gentle,
  });
  const animatedCircleValues = useSpring({
    opacity: isHovered ? 0.1 : 0,
    transform: isHovered ? 'scale(1.5)' : 'scale(1)',
    config: config.gentle,
  });

  const AnimatedIcon = animated(Icon);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <Flex
      as="a"
      href={`${link}${tweetId}`}
      target="_blank"
      rel="noreferrer noopener"
      pos="relative"
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
      h="20px"
      w="20px"
    >
      <AnimatedIcon style={animatedValues} boxSize={5} mr={2} />
      <AnimatedBox
        pos="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        bgColor="twitter"
        borderRadius="50%"
        style={animatedCircleValues}
      />
    </Flex>
  );
};

const TweetBoxActions: React.FC<{
  favorite_count: number;
  retweet_count: number;
  tweetId: stringType;
}> = memo(function TweetBoxActions({ favorite_count, retweet_count, tweetId }) {
  return (
    <Flex justify="space-between" color="textSecondary" mt={4}>
      <Flex align="center">
        <TwitterActionButton
          tweetId={tweetId}
          link="https://twitter.com/intent/like?tweet_id="
          Icon={TwitterFavoriteIcon}
        />
        <Text ml={2}>{favorite_count.toLocaleString('en')}</Text>
      </Flex>
      <Flex align="center">
        <TwitterActionButton
          tweetId={tweetId}
          link="https://twitter.com/intent/retweet?tweet_id="
          Icon={TwitterRetweetIcon}
        />
        <Text ml={2}>{retweet_count.toLocaleString('en')}</Text>
      </Flex>
      <Flex align="center">
        <TwitterActionButton
          tweetId={tweetId}
          link="https://twitter.com/intent/tweet?in_reply_to="
          Icon={TwitterReplyIcon}
        />
      </Flex>
      <Flex align="center">
        <TwitterLogoIcon color="twitter" boxSize={8} />
      </Flex>
    </Flex>
  );
});

export default TweetBoxActions;
