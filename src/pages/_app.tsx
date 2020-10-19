import React from 'react';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/core';
import NProgress from 'nprogress';
import 'focus-visible/dist/focus-visible';
import '../styles/nprogress.css';

import theme from '../theme';
import { MediaContextProvider } from '../media';

const startProgress = () => {
  NProgress.start();
};
const stopProgress = (timer: NodeJS.Timeout) => {
  clearTimeout(timer);
  NProgress.done();
};

const showProgressBar = (delay: number) => {
  const timer = setTimeout(startProgress, delay);
  Router.events.on('routeChangeComplete', () => stopProgress(timer));
  Router.events.on('routeChangeError', () => stopProgress(timer));
};

Router.events.on('routeChangeStart', () => showProgressBar(300));
Router.events.on('routeChangeComplete', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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
