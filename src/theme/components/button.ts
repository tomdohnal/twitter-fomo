export default {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: 800,
    textTransform: 'lowerCase',
    borderRadius: 'none',
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    sm: {
      h: 8,
      // @ts-ignore
      boxShadow({ shadows, colors }) {
        return shadows.sm(colors.primaryPalette['200']);
      },
      _hover: {
        boxShadow: 'none',
      },
    },
    md: {
      h: 12,
      fontSize: 'lg',
      // @ts-ignore
      boxShadow({ shadows, colors }) {
        return shadows.sm(colors.primaryPalette['200']);
      },
      _hover: {
        boxShadow: 'none',
      },
    },
    lg: {
      h: 16,
      fontSize: 'xl',
      // @ts-ignore
      boxShadow({ shadows, colors }) {
        return shadows.sm(colors.primaryPalette['200']);
      },
      _hover: {
        boxShadow: 'none',
      },
    },
    xl: {
      h: 20,
      px: 8,
      fontSize: '2xl',
      // @ts-ignore
      boxShadow({ shadows, colors }) {
        return shadows.md(colors.primaryPalette['200']);
      },
      _hover: {
        boxShadow: 'none',
      },
    },
    '2xl': {
      h: 24,
      px: 10,
      fontSize: '4xl',
      // @ts-ignore
      boxShadow({ shadows, colors }) {
        return shadows.md(colors.primaryPalette['200']);
      },
      _hover: {
        boxShadow: 'none',
      },
    },
  },
  // 3. We can add a new visual variant
  variants: {
    solid: {
      color: 'primaryPalette.50',
      bg: 'primary',
      _hover: {
        bg: 'primaryPalette.800',
      },
      _active: {
        bg: 'primaryPalette.900',
      },
    },
    solidLight: {
      color: 'primaryPalette.800',
      bg: 'primaryPalette.50',
      _hover: {
        bg: 'primaryPalette.100',
      },
      _active: {
        bg: 'primaryPalette.200',
      },
    },
  },
};
