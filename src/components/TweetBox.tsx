import React, { ReactNode } from 'react';
import { MediaEntity, Status } from 'twitter-d';
import reactStringReplace from 'react-string-replace';
import escapeStringRegexp from 'escape-string-regexp';
import { Box, Image, Text, AspectRatio, useTheme, Link } from '@chakra-ui/core';
import { useIsHovered } from '../utils';
import { useSpring, animated } from 'react-spring';

const AnimatedBox = animated(Box);

// TODO: 1309156899879821314
const TweetBox: React.FC<{
  content: ReactNode;
  header: ReactNode;
  actions: ReactNode;
  href: string;
}> = ({ content, header, actions, href }) => {
  const theme = useTheme();
  const [isHovered, listeners] = useIsHovered();
  const animatedValues = useSpring({
    boxShadow: isHovered ? theme.shadows.sm('transparent') : theme.shadows.sm(),
    backgroundColor: isHovered ? theme.colors.gray['50'] : '#fff',
  });

  return (
    <AnimatedBox
      borderWidth={2}
      borderColor="gray.900"
      bg="white"
      p={[3, null, 4]}
      pos="relative"
      style={animatedValues}
      {...listeners}
    >
      <Link
        href={href}
        rel="noreferrer noopener"
        target="_blank"
        pos="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
      />
      {header}
      <Box mt={4}>{content}</Box>
      {actions}
    </AnimatedBox>
  );
};

export default TweetBox;
