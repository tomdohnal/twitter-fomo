import React from 'react';
import { ChakraProvider } from '@chakra-ui/core';

import theme from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
