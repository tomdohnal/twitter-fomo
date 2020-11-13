import { Box, BoxProps, Link, useTheme } from '@chakra-ui/core';
import React, { ReactNode, memo } from 'react';
import { animated, useSpring } from 'react-spring';
import { useIsHovered } from '../utils';

const AnimatedBox = animated(Box);

const TweetBox: React.FC<
  {
    content: ReactNode;
    header: ReactNode;
    actions: ReactNode;
    href: string;
  } & BoxProps
> = memo(function TweetBox({ content, header, actions, href, ...restProps }) {
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
      {...restProps}
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

export default TweetBox;
