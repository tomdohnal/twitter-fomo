export default {
  global: ({ theme }: any) => ({
    'html, body': {
      color: theme.colors.text,
      fontFamily: '"Exo 2", sans-serif',
    },
    'img:-moz-loading': {
      visibility: 'hidden',
    },
  }),
};
