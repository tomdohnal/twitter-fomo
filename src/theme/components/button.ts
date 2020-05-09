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
      boxShadow({ shadows, colors }: Record<string, any>) {
        return shadows.sm(colors.primaryPalette['200']);
      },
      _hover: {
        boxShadow: 'none',
      },
    },
    md: {
      h: 12,
      fontSize: 'lg',
      boxShadow({ shadows, colors }: Record<string, any>) {
        return shadows.sm(colors.primaryPalette['200']);
      },
      _hover: {
        boxShadow: 'none',
      },
    },
    lg: {
      h: 16,
      fontSize: 'xl',
      boxShadow({ shadows, colors }: Record<string, any>) {
        return shadows.sm(colors.primaryPalette['200']);
      },
      _hover: {
        boxShadow: 'none',
      },
    },
    xl: {
      height: { base: 16, lg: 20 },
      borderRadius: 'none',
      fontSize: { base: 'xl', lg: '2xl' },
      px: { base: 4, lg: 8 },
      boxShadow({ shadows, colors }: Record<string, any>) {
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
      boxShadow({ shadows, colors }: Record<string, any>) {
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
    link: {
      boxShadow: 'none',
      h: 'auto',
      px: 'none',
    },
    text: {
      background: 'none',
      border: 'none',
      boxShadow: 'none',
      margin: 0,
      padding: 0,
      h: 'auto',
      fontWeight: 'normal',
      fontSize: '1rem',
      textDecoration: 'none',
      _hover: {
        textDecoration: 'underline',
      },
    },
  },
};
