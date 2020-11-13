import React from 'react';
import { NextSeo } from 'next-seo';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TopSection from '../components/TopSection';
import ProblemSolutionSection from '../components/ProblemSolutionSection';
import WhatAreYouWaitingForSection from '../components/WhatAreYouWaitingForSection';
import prisma from '../prisma';
import { InferGetStaticPropsType } from 'next';
import { Status } from 'twitter-d';

export const getStaticProps = async () => {
  const tweets = await prisma.tweet.findMany({
    where: {
      publishedAt: {
        gte: new Date(Date.now() - 86400000 * 7),
      },
    },
    select: {
      id: true,
      accountName: true,
      favoritesCount: true,
      retweetsCount: true,
      text: true,
      publishedAt: true,
      accountProfileImageUrl: true,
      accountScreenName: true,
      payload: true,
    },
    orderBy: {
      favoritesCount: 'desc',
    },
    take: 3,
  });

  const tweetProps = tweets.map((tweet) => ({
    ...tweet,
    publishedAt: tweet.publishedAt.toDateString(),
  }));

  return {
    props: {
      tweets: (tweetProps as unknown) as (Omit<typeof tweetProps[0], 'payload'> & {
        payload: Status;
      })[],
    },
  };
};

const Index: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  tweets,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <NextSeo title="TwitterFOMO" description="TwitterFOMO—The best tweets in web development" />
    <Navbar />
    <TopSection tweets={tweets} />
    <ProblemSolutionSection />
    <WhatAreYouWaitingForSection />
    <FAQ heading="Still got questions?" bgColor="primaryPalette.50" />
    <Footer />
  </>
);

export default Index;
