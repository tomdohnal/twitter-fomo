import React, { useEffect } from 'react';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/core';
import NProgress from 'nprogress';
import { hotjar } from 'react-hotjar';
import 'focus-visible/dist/focus-visible';
import '../styles/nprogress.css';

import theme from '../theme';
import { MediaContextProvider } from '../media';
import NewsletterPrompt from '../components/NewsletterPrompt';

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
  useEffect(() => {
    hotjar.initialize(2059179, 6);
  }, []);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <MediaContextProvider>
        <Component {...pageProps} />
        <NewsletterPrompt />
      </MediaContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
