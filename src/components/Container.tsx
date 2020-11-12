import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

const MAX_WIDTH = '1200px';

export const CONTAINER_PX = { base: 3, md: 8, lg: 12 };

const getStyleProps = ({
  isFullLeft,
  isFullRight,
}: {
  isFullLeft?: boolean;
  isFullRight?: boolean;
}) => {
  if (isFullLeft) {
    return {
      mr: 'auto',
      maxW: `calc(${MAX_WIDTH} + ((100vw - ${MAX_WIDTH}) / 2))`,
      px: CONTAINER_PX,
    };
  }

  if (isFullRight) {
    return {
      ml: 'auto',
      maxW: `calc(${MAX_WIDTH} + ((100vw - ${MAX_WIDTH}) / 2))`,
      px: CONTAINER_PX,
    };
  }

  return {
    mx: 'auto',
    maxW: MAX_WIDTH,
    px: CONTAINER_PX,
  };
};

const Container: React.FC<
  {
    isFullLeft?: boolean;
    isFullRight?: boolean;
  } & BoxProps
> = ({ children, isFullLeft, isFullRight, ...props }) => {
  const styleProps = getStyleProps({
    isFullLeft,
    isFullRight,
  });

  return (
    <Box width="100%" {...styleProps} {...props}>
      {children}
    </Box>
  );
};

export default Container;
