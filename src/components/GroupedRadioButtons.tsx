import {
  Box,
  ChakraProps,
  Flex,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  useTheme,
} from '@chakra-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

const AnimatedBox = animated(Box);

type RadioButtonProps = UseRadioProps & {
  isAnimationReady: boolean;
  variant?: string;
};

const getRadioButtonStyles = (variant?: string): ChakraProps => ({
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
  textTransform: 'lowercase',
  ...(variant === 'full' && {
    width: '100%',
    justifyContent: 'center',
  }),
});

const radioButtonCheckedStyles = {
  bgColor: 'primary',
  color: 'primaryPalette.50',
};

const RadioButton: React.FC<RadioButtonProps> = ({
  children,
  isAnimationReady,
  variant,
  ...restProps
}) => {
  const { getInputProps, getCheckboxProps } = useRadio(restProps);
  const theme = useTheme();

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const checkedStyles = isAnimationReady ? {} : radioButtonCheckedStyles;

  return (
    <Box as="label" flexGrow={variant === 'full' ? 1 : undefined}>
      <input {...input} />
      <Box
        {...checkbox}
        {...getRadioButtonStyles(variant)}
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

  variant?: string;
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

const GroupedRadioButtons: React.FC<GroupedRadioButtonsProps> = ({
  items,
  value,
  setValue,
  variant,
}) => {
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
        index: items.findIndex((item) => item.value === value),
      });

      setAnimatedHighlightStyle({ clipPath: newClipPath }).then(() => {
        setIsAnimationReady(true);
      });
    }
  }, [isWidthCalculated, value, setAnimatedHighlightStyle, items]);

  const group = getRootProps();

  return (
    <Box position="relative">
      <Flex {...group} pl="1px">
        {items.map(({ value, label }) => {
          const radio = getRadioProps({ value });

          return (
            <RadioButton
              key={value}
              isAnimationReady={isAnimationReady}
              variant={variant}
              {...radio}
            >
              {label}
            </RadioButton>
          );
        })}
      </Flex>
      <AnimatedBox
        style={animatedHighlightStyle}
        position="absolute"
        top={0}
        aria-hidden="true"
        display="inline-flex"
        pl="1px"
        {...(variant === 'full' && {
          left: 0,
          right: 0,
        })}
      >
        {items.map(({ value, label }, index) => {
          return (
            <Box
              key={value}
              ref={(ref: HTMLDivElement | null) => {
                if (ref) {
                  // TODO: remove this workaround
                  // and investigate why the animation does
                  // not work on mobiles
                  setTimeout(() => {
                    const { width } = ref.getBoundingClientRect();

                    buttonWidthsRef.current[index] = width;

                    if (buttonWidthsRef.current.every(Boolean)) {
                      setIsWidthCalculated(true);
                    }
                  });
                }
              }}
              flexGrow={variant === 'full' ? 1 : undefined}
            >
              <Box {...getRadioButtonStyles(variant)} {...radioButtonCheckedStyles}>
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
