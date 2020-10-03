import React, { useState } from 'react';
import { Flex, Text, Image, Box } from '@chakra-ui/core';
import { animated, useSpring, config } from 'react-spring';

const AnimatedBox = animated(Box);

const TweetBoxHeader: React.FC<{
  created_at: string;
  name: string;
  imageUrl: string;
  screenName: string;
}> = ({ created_at, name, imageUrl, screenName }) => {
  const [isNameHovered, setNameIsHovered] = useState(false);
  const animatedValues = useSpring({ opacity: isNameHovered ? 1 : 0, config: config.gentle });

  return (
    <Flex>
      <Flex>
        <Image w={12} h={12} src={imageUrl} alt={`${name} profile image`} mr={4} />
        <Flex direction="column">
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
            fontSize="xl"
            fontWeight="bold"
            pos="relative"
          >
            {name}
            <AnimatedBox
              pos="absolute"
              left={0}
              right={0}
              bottom={2}
              height="2px"
              bgColor="currentColor"
              style={animatedValues}
            />
          </Text>
          <Text color="textSecondary" fontSize="sm">
            @{screenName}
          </Text>
        </Flex>
      </Flex>
      <Text mt={1} ml="auto" color="textSecondary" fontSize="sm">
        {new Date(created_at).toLocaleDateString('en', {
          hour: 'numeric',
          minute: 'numeric',
        })}
      </Text>
    </Flex>
  );
};

export default TweetBoxHeader;
