import React from 'react';
import { ChakraProvider } from '@chakra-ui/core';

import theme from '../theme';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ? Component.getLayout : page => page;

  return (
    <ChakraProvider resetCSS theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}

export default MyApp;
