import { Box, Link, useTheme } from '@chakra-ui/core';
import React, { ReactNode, memo } from 'react';
import { useSpring, animated } from 'react-spring';
import { useIsHovered } from '../utils';

const AnimatedBox = animated(Box);

const TweetBoxCropped: React.FC<{
  content: ReactNode;
  header: ReactNode;
  actions: ReactNode;
  href: string;
}> = memo(function TweetBoxCropped({ href, header, content, actions }) {
  const theme = useTheme();
  const [isHovered, listeners] = useIsHovered();
  const animatedValues = useSpring({
    backgroundColor: isHovered ? theme.colors.gray['50'] : '#fff',
  });

  return (
    <AnimatedBox
      borderWidth={2}
      borderColor="gray.900"
      borderTop="none"
      pos="relative"
      _last={{
        borderBottom: 'none',
      }}
      p={[3, null, 4]}
      style={animatedValues}
      // maxH="256px"
      overflow="hidden"
      position="relative"
      boxShadow={theme.shadows.sm()}
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
});

export default TweetBoxCropped;
