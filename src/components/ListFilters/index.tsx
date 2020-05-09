import React, { memo } from 'react';
import { Box } from '@chakra-ui/core';

import { Props } from './common';
import DesktopListFilters from './DesktopListFilters';
import MobileListFilters from './MobileListFilters';

const ListFilters: React.FC<Props> = memo(function ListFilters(props) {
  return (
    <>
      <Box display={{ md: 'none' }}>
        <MobileListFilters {...props} />
      </Box>
      <Box display={{ base: 'none', md: 'block' }}>
        <DesktopListFilters {...props} />
      </Box>
    </>
  );
});

export default ListFilters;
