import React, { useEffect } from 'react';
import Router from 'next/router';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/core';
import NProgress from 'nprogress';
import { hotjar } from 'react-hotjar';
import 'focus-visible/dist/focus-visible';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
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
        iteratee: (frame) => {
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

function MyApp({ Component, pageProps, err }: AppProps & { err: Error }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      hotjar.initialize(2059179, 6);
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="TwitterFOMO—A list of the top tweets in WebDev. See the best new tweets from the best account in the web development community."
        />

        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
        <meta name="theme-color" content="#A30664" />
      </Head>
      <DefaultSeo
        openGraph={{
          images: [
            {
              url: 'https://twitterfomo.dev/preview.png',
            },
          ],
        }}
      />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} err={err} />
        <NewsletterPrompt />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
