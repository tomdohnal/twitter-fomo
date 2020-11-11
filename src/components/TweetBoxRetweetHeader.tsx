import React, { useState } from 'react';
import { Flex, Text, Img, Box } from '@chakra-ui/core';
import { animated, useSpring } from 'react-spring';

const AnimatedBox = animated(Box);

const TweetBoxRetweetHeader: React.FC<{
  created_at: string;
  name: string;
  imageUrl: string;
  screenName: string;
}> = ({ created_at, name, imageUrl, screenName }) => {
  const [isNameHovered, setNameIsHovered] = useState(false);
  const animatedValues = useSpring({
    transform: isNameHovered ? 'scaleX(1)' : 'scaleX(0)',
  });

  return (
    <Flex alignItems="baseline">
      <Img w={4} h={4} src={imageUrl} alt={`${name} profile image`} mr={2} flexShrink={0} />
      <Flex flexShrink={1} overflow="hidden" alignItems="baseline" mr={1}>
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <Text
          as="a"
          href={`https://twitter.com/${screenName}`}
          target="_blank"
          rel="noreferrer noopener"
          onMouseOver={() => {
            setNameIsHovered(true);
          }}
          onMouseOut={() => {
            setNameIsHovered(false);
          }}
          fontSize="md"
          fontWeight="bold"
          pos="relative"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          mr={1}
          flexShrink={0}
        >
          {name}
          <AnimatedBox
            pos="absolute"
            left={0}
            right={0}
            bottom="2px"
            height="2px"
            bgColor="currentColor"
            transformOrigin="0% 50%"
            style={animatedValues}
          />
        </Text>
        <Text
          flexShrink={1}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          color="textSecondary"
          fontSize="sm"
        >
          @{screenName}
        </Text>
      </Flex>
      <Text flexShrink={0} mt={1} ml="auto" color="textSecondary" fontSize="xs">
        {new Date(created_at).toLocaleDateString('en')}
      </Text>
    </Flex>
  );
};

export default TweetBoxRetweetHeader;
