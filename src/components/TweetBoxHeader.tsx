import React, { useState, memo } from 'react';
import { Flex, Text, Image, Box } from '@chakra-ui/core';
import { animated, useSpring, config } from 'react-spring';

const AnimatedBox = animated(Box);

const TweetBoxHeader: React.FC<{
  created_at: string;
  name: string;
  imageUrl: string;
  screenName: string;
}> = memo(function TweetBoxHeader({ created_at, name, imageUrl, screenName }) {
  const [isNameHovered, setNameIsHovered] = useState(false);
  const animatedValues = useSpring({
    transform: isNameHovered ? 'scaleX(1)' : 'scaleX(0)',
  });

  return (
    <Flex>
      <Flex minW={0}>
        <Image w={12} h={12} src={imageUrl} alt={`${name} profile image`} mr={4} />
        <Flex direction="column" overflow="hidden">
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
            minW={0}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
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
            color="textSecondary"
            fontSize="sm"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            @{screenName}
          </Text>
        </Flex>
      </Flex>
      <Text flexShrink={0} mt={1} ml="auto" color="textSecondary" fontSize="sm">
        {new Date(created_at).toLocaleDateString('en', {
          hour: 'numeric',
          minute: 'numeric',
        })}
      </Text>
    </Flex>
  );
});

export default TweetBoxHeader;
