import React, { useState, useRef, useEffect } from 'react';
import { useRadio, Box, useRadioGroup, HStack, UseRadioProps, useTheme } from '@chakra-ui/core';
import { animated, useSpring, config } from 'react-spring';

const AnimatedBox = animated(Box);

type RadioButtonProps = UseRadioProps & {
  isAnimationReady: boolean;
};

const radioButtonStyles = {
  h: '36px',
  cursor: 'pointer',
  borderWidth: '1px',
  borderColor: 'primary',
  fontWeight: 800,
  display: 'inline-flex',
  alignItems: 'center',
  px: 3,
  ml: '-1px',
  bgColor: 'primaryPalette.50',
  color: 'primaryPalette.800',
  textTransform: 'lowerCase',
};

const radioButtonCheckedStyles = {
  bgColor: 'primary',
  color: 'primaryPalette.50',
};

// TODO:
// shadow
const RadioButton: React.FC<RadioButtonProps> = ({ children, isAnimationReady, ...restProps }) => {
  const { getInputProps, getCheckboxProps } = useRadio(restProps);
  const theme = useTheme();

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const checkedStyles = isAnimationReady ? {} : radioButtonCheckedStyles;

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        {...radioButtonStyles}
        boxShadow={theme.shadows.sm(theme.colors.primaryPalette['200'])}
        _checked={checkedStyles}
      >
        {children}
      </Box>
    </Box>
  );
};

interface GroupedRadioButtonsProps {
  value: string | number;

  setValue(value: string | number): void;

  items: { value: string; label: string }[];
}

const getClipPath = ({ widths, index }: { widths: number[]; index: number }) => {
  const start = widths.reduce((tally, current, currentIndex) => {
    if (currentIndex < index) {
      return tally + current;
    }

    return tally;
  }, 0);
  const end = widths.reduce((tally, current, currentIndex) => {
    if (currentIndex <= index) {
      return tally + current;
    }

    return tally;
  }, 1); // extra pixel for border

  return `polygon(${start}px 0, ${end}px 0, ${end}px 100%, ${start}px 100%)`;
};

const GroupedRadioButtons: React.FC<GroupedRadioButtonsProps> = ({ items, value, setValue }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: value,
    onChange(e) {
      setValue(e);
    },
  });
  const [isWidthCalculated, setIsWidthCalculated] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const buttonWidthsRef = useRef<(number | null)[]>(items.map(() => null));
  const [animatedHighlightStyle, setAnimatedHighlightStyle] = useSpring(
    {
      clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)',
      config: config.gentle,
    },
    [],
  );

  useEffect(() => {
    if (isWidthCalculated) {
      const newClipPath = getClipPath({
        widths: buttonWidthsRef.current as number[],
        index: items.findIndex(item => item.value === value),
      });

      setAnimatedHighlightStyle({ clipPath: newClipPath }).then(() => {
        setIsAnimationReady(true);
      });
    }
  }, [isWidthCalculated, value, setAnimatedHighlightStyle, items]);

  const group = getRootProps();

  return (
    <Box position="relative">
      <HStack spacing={0} {...group} pl="1px">
        {items.map(({ value, label }) => {
          const radio = getRadioProps({ value });

          return (
            <RadioButton key={value} isAnimationReady={isAnimationReady} {...radio}>
              {label}
            </RadioButton>
          );
        })}
      </HStack>
      <AnimatedBox
        style={animatedHighlightStyle}
        position="absolute"
        top={0}
        aria-hidden="true"
        display="inline-flex"
        spacing={0}
        pl="1px"
      >
        {items.map(({ value, label }, index) => {
          return (
            <Box
              key={value}
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  const { width } = ref.getBoundingClientRect();

                  buttonWidthsRef.current[index] = width;

                  if (buttonWidthsRef.current.every(Boolean)) {
                    setIsWidthCalculated(true);
                  }
                }
              }}
            >
              <Box {...radioButtonStyles} {...radioButtonCheckedStyles}>
                {label}
              </Box>
            </Box>
          );
        })}
      </AnimatedBox>
    </Box>
  );
};

export default GroupedRadioButtons;
