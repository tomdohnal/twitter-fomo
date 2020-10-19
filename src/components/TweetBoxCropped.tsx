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
      _notFirst={{ borderTop: 'none' }}
      _last={{ borderBottom: 'none' }}
      bg="white"
      p={[3, null, 4]}
      pos="relative"
      style={animatedValues}
      maxH="256px"
      overflow="hidden"
      position="relative"
      boxShadow={theme.shadows.sm()}
      _before={{
        content: '""',
        background: 'linear-gradient(to top, white, transparent 50%)',
        position: 'absolute',
        top: 0,
        bottom: '56px',
        left: '2px',
        right: '2px',
        // height: '256px',
        zIndex: 1,
        pointerEvents: 'none',
      }}
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
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        pb="8px"
        px="16px"
        zIndex={1}
        backgroundColor="#fff"
        height="56px"
      >
        {actions}
      </Box>
    </AnimatedBox>
  );
});

export default TweetBoxCropped;
