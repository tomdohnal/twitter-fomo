import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { Box, useTheme } from '@chakra-ui/core';
import { useSpring, animated, config } from 'react-spring';

const AnimatedBox = animated(Box);

interface Props {
  isChecked: boolean;

  variant?: string;

  onCheck(isChecked: boolean): void;
}

const CheckboxButton: React.FC<Props> = ({ isChecked, onCheck, children, variant }) => {
  const theme = useTheme();
  const checkmarkRef = useRef<SVGPathElement | null>(null);
  const [checkmarkOffset, setCheckmarkOffset] = useState<number | null>(null);
  const labelAnimationStyle = useSpring({
    ...(isChecked
      ? {
          backgroundColor: theme.colors.primary,
          color: theme.colors.primaryPalette['50'],
          boxShadow: theme.shadows.sm(theme.colors.primaryPalette['300']),
        }
      : {
          backgroundColor: theme.colors.primaryPalette['50'],
          color: theme.colors.primaryPalette['800'],
          boxShadow: theme.shadows.sm(theme.colors.primaryPalette['100']),
        }),
    config: config.gentle,
  });
  const checkboxAnimationStyle = useSpring({
    ...(isChecked
      ? {
          backgroundColor: theme.colors.primaryPalette['50'],
        }
      : {
          backgroundColor: theme.colors.white,
        }),
    config: config.gentle,
  });
  const checkAnimationStyle = useSpring({
    ...(isChecked
      ? {
          x: 0,
        }
      : { x: checkmarkOffset }),
    config: { ...config.gentle, clamp: !isChecked },
  });

  useEffect(() => {
    if (checkmarkRef.current) {
      setCheckmarkOffset(checkmarkRef.current.getTotalLength());
    }
  }, []);

  return (
    <AnimatedBox
      as="label"
      pr={3}
      pl={10}
      h="36px"
      fontWeight={800}
      textTransform="lowercase"
      position="relative"
      cursor="pointer"
      display="inline-flex"
      alignItems="center"
      style={labelAnimationStyle}
      {...(variant === 'full' && {
        width: '100%',
      })}
    >
      <Box
        position="absolute"
        h="1px"
        w="1px"
        overflow="hidden"
        as="input"
        type="checkbox"
        checked={isChecked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onCheck(e.target.checked);
        }}
        __css={{ clip: 'rect(1px, 1px, 1px, 1px)' }}
      />
      <AnimatedBox
        style={checkboxAnimationStyle}
        h={5}
        w={5}
        position="absolute"
        top={2}
        left={3}
        border="2px"
        borderColor="primary"
      >
        <Box
          position="absolute"
          top="2px"
          as="svg"
          color="primaryPalette.800"
          width="15"
          height="11"
          viewBox="0 0 15 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <animated.path
            strokeDashoffset={checkAnimationStyle.x}
            strokeDasharray={`${checkmarkOffset} ${checkmarkOffset}`} // cant be just `checkmarkOffset` due to Safari issue
            ref={checkmarkRef}
            d="M1 4.5L5 9L14 1"
            stroke={!isChecked && checkmarkOffset === null ? 'none' : 'currentColor'}
            strokeWidth="2"
          />
        </Box>
      </AnimatedBox>
      {children}
    </AnimatedBox>
  );
};

export default CheckboxButton;
