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

  return {
    props: {
      tweets: tweets.map(tweet => ({
        ...tweet,
        publishedAt: tweet.publishedAt.toDateString(),
      })),
    },
  };
};

const Index: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ tweets }) => (
  <>
    <NextSeo
      title="TwitterFOMO"
      description="TwitterFOMO—A curated list of the best tweets in web development"
    />
    <Navbar />
    <TopSection tweets={tweets} />
    <ProblemSolutionSection />
    <WhatAreYouWaitingForSection />
    <FAQ />
    <Footer />
  </>
);

export default Index;
