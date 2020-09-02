import React from 'react';
import { Box } from '@chakra-ui/core';

const ContentContainer: React.FC = ({ children }) => {
  return (
    <Box maxW="6xl" mx="auto" py={8}>
      {children}
    </Box>
  );
};

export default ContentContainer;
