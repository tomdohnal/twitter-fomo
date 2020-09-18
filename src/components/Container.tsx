import React from 'react';
import { Box } from '@chakra-ui/core';

interface Props {
  isFullLeft?: boolean;
  isFullRight?: boolean;
}

const MAX_WIDTH = '1024px';

export const CONTAINER_PX = { base: 4, md: 8, lg: 16 };

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
    };
  }

  if (isFullRight) {
    return {
      ml: 'auto',
      maxW: `calc(${MAX_WIDTH} + ((100vw - ${MAX_WIDTH}) / 2))`,
    };
  }

  return {
    mx: 'auto',
    maxW: MAX_WIDTH,
    px: CONTAINER_PX,
  };
};

const Container: React.FC<Props> = ({ children, isFullLeft, isFullRight, ...props }) => {
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
