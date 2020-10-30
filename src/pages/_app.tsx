import React, { useEffect } from 'react';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/core';
import NProgress from 'nprogress';
import { hotjar } from 'react-hotjar';
import 'focus-visible/dist/focus-visible';
import * as gtag from '../gtag';
import '../styles/nprogress.css';

import theme from '../theme';
import NewsletterPrompt from '../components/NewsletterPrompt';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import getConfig from 'next/config';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig();
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: frame => {
          frame.filename = frame.filename?.replace(distDir, 'app:///_next');
          return frame;
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

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
Router.events.on('routeChangeComplete', (url: string) => {
  gtag.pageview(url);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// @ts-ignore
function MyApp({ Component, pageProps, err }) {
  useEffect(() => {
    hotjar.initialize(2059179, 6);
  }, []);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} err={err} />
      <NewsletterPrompt />
    </ChakraProvider>
  );
}

export default MyApp;
