import { useState } from 'react';

export const useIsHovered = (): [
  boolean,
  {
    onMouseOver: () => void;
    onMouseOut: () => void;
  },
] => {
  const [isHovered, setIsHovered] = useState(false);

  const listeners = {
    onMouseOver() {
      setIsHovered(true);
    },
    onMouseOut() {
      setIsHovered(false);
    },
  };

  return [isHovered, listeners];
};
