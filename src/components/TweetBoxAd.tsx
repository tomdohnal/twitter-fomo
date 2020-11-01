import React from 'react';
import { Text } from '@chakra-ui/core';
import TweetBox from './TweetBox';
import TweetBoxHeader from './TweetBoxHeader';
import TweetBoxContent from './TweetBoxContent';

const TweetBoxAd: React.FC = ({ ...restProps }) => {
  return (
    <TweetBox
      border="2px dashed"
      header={
        <TweetBoxHeader
          created_at={new Date().toISOString()}
          imageUrl="/icons/icon-72x72.png"
          name="TwitterFOMO"
          screenName="tom_dohnal"
        />
      }
      content={
        <TweetBoxContent
          tweet={{
            full_text:
              "Wanna create a cool side project like TwitterFOMO? (Or maybe even cooler? 😲) If you're bad at setting up servers and DBs like I am 🙈, go and try your luck Managed Database and App Platform on Digital Ocean. You'll get $100 in credits. Try your luck and DO NOT QUIT YOUR DREAM SIDE PROJECT THIS TIME!!!",
            entities: {
              urls: [
                {
                  url: 'https://m.do.co/c/af0d3ce64be5',
                  expanded_url: 'https://m.do.co/c/af0d3ce64be5',
                },
              ],
            },
            linkDescription:
              "Get $100 in credit over 60 days. Once you spent 25$ with Digital Ocean, I get $25. (Yes, I'm that transparent 😉)",
            linkTitle: 'Get $100 for Digital Ocean',
            linkImageUrl: '/digital_ocean.png',
          }}
        />
      }
      actions={
        <Text
          pt={4}
          display="inline-block"
          as="span"
          color="textSecondary"
          fontSize="sm"
          fontStyle="italic"
        >
          Don't get fooled. This isn't a real tweet 😇
        </Text>
      }
      href="https://m.do.co/c/af0d3ce64be5"
      {...restProps}
    />
  );
};

export default TweetBoxAd;
