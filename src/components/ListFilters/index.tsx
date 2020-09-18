import React, { memo } from 'react';

import { Media } from '../../media';
import { Props } from './common';
import DesktopListFilters from './DesktopListFilters';
import MobileListFilters from './MobileListFilters';

const ListFilters: React.FC<Props> = memo(props => {
  return (
    <>
      <Media lessThan="md">
        <MobileListFilters {...props} />
      </Media>
      <Media greaterThan="sm">
        <DesktopListFilters {...props} />
      </Media>
    </>
  );
});

export default ListFilters;
