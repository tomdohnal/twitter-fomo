import React from 'react';
import { ChakraProvider } from '@chakra-ui/core';

import theme from '../theme';
import { MediaContextProvider } from '../media';

// @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <MediaContextProvider>
        <Component {...pageProps} />
      </MediaContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
