import defaultTheme, { Theme as ChakraTheme } from '@chakra-ui/theme';
//
// interface Theme extends ChakraTheme {
//   colors: ChakraTheme['colors'] & {
//     primaryPalette: {
//       50: string;
//       100: string;
//       200: string;
//       300: string;
//       400: string;
//       500: string;
//       600: string;
//       700: string;
//       800: string;
//       900: string;
//     },
//     primary: string,
//     text: string,
//     lightText: string,
//   },
//   shadows: {
//     md: string,
//     lg: string,
//   }
// }

const theme = {
  ...defaultTheme,
  styles: {
    global: ({ colorMode, theme }: any) => ({
      'html, body': {
        fontSize: 'sm',
        color: colorMode === 'dark' ? 'white' : theme.colors.text,
        lineHeight: 'tall',
      },
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
      },
    }),
  },
  fonts: {
    ...defaultTheme.fonts,
    body: '"Exo 2", sans-serif',
    heading: '"Exo 2", sans-serif',
  },
  colors: {
    ...defaultTheme.colors,
    gray: {
      50: '#F7F7F7',
      100: '#E1E1E1',
      200: '#CFCFCF',
      300: '#B1B1B1',
      400: '#9E9E9E',
      500: '#7E7E7E',
      600: '#626262',
      700: '#515151',
      800: '#3B3B3B',
      900: '#222222',
    },
    primaryPalette: {
      50: '#FFE3EC',
      100: '#FFB8D2',
      200: '#FF8CBA',
      300: '#F364A2',
      400: '#E8368F',
      500: '#DA127D',
      600: '#BC0A6F',
      700: '#A30664',
      800: '#870557',
      900: '#620042',
    },
    primary: '#A30664',
    text: '#620042',
    textSecondary: '#626262',
  },
  shadows: {
    md: '2px 2px 0px #B1B1B1',
    lg: '4px 4px 0px #B1B1B1',
  },
};

export default theme;
