import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

type Props = Omit<BoxProps, 'as'>;

const Section: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Box as="section" {...props}>
      {children}
    </Box>
  );
};

export default Section;
