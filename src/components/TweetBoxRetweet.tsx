import React, { ReactNode } from 'react';
import { Box, useTheme, Link } from '@chakra-ui/core';
import { useIsHovered } from '../utils';
import { useSpring, animated } from 'react-spring';

const AnimatedBox = animated(Box);

const TweetBoxRetweet: React.FC<{
  content: ReactNode;
  header: ReactNode;
  href: string;
}> = ({ content, header, href }) => {
  const theme = useTheme();
  const [isHovered, listeners] = useIsHovered();
  const animatedValues = useSpring({
    backgroundColor: isHovered ? theme.colors.gray['50'] : '#fff',
  });

  return (
    <AnimatedBox
      borderWidth={2}
      borderColor="gray.400"
      bg="white"
      p={[2, null, 3]}
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
      <Box mt={2}>{content}</Box>
    </AnimatedBox>
  );
};

export default TweetBoxRetweet;
