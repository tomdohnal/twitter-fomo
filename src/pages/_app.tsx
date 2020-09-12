import React, { ReactElement } from 'react';
import { ChakraProvider } from '@chakra-ui/core';

import theme from '../theme';

// @ts-ignore
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ? Component.getLayout : (page: ReactElement) => page;

  return (
    <ChakraProvider resetCSS theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}

export default MyApp;
