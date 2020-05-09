import shadows from '../foundations/shadows';

export default {
  baseStyle: {
    field: {
      fontWeight: 600,
    },
  },
  sizes: {
    sm: {
      field: {
        height: 8,
        borderRadius: 'none',
        boxShadow: shadows.sm(),
      },
    },
    md: {
      field: {
        borderRadius: 'none',
        height: 12,
        boxShadow: shadows.sm(),
      },
    },
    lg: {
      field: {
        height: 16,
        borderRadius: 'none',
        boxShadow: shadows.sm(),
      },
    },
    xl: {
      field: {
        height: { base: 16, lg: 20 },
        borderRadius: 'none',
        fontSize: { base: 'lg', lg: 'xl' },
        px: { base: 3, lg: 5 },
        boxShadow: shadows.md(),
      },
    },
    '2xl': {
      field: {
        height: 24,
        borderRadius: 'none',
        fontSize: '2xl',
        px: 5,
        boxShadow: shadows.md(),
      },
    },
  },
  variants: {
    outline: {
      field: {
        border: '2px solid',
        _focus: {
          borderColor: 'primary',
          boxShadow: 'none',
        },
      },
    },
  },
};
