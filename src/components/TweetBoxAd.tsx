import React from 'react';
import { Text } from '@chakra-ui/core';
import TweetBox from './TweetBox';
import TweetBoxHeader from './TweetBoxHeader';
import TweetBoxContent from './TweetBoxContent';
import { Status } from 'twitter-d';

const adTweet = ({
  full_text:
    "Wanna create a cool side project like TwitterFOMO? (Or maybe even cooler? 😲) I've got good news for you. I started a YouTube channel where I'm gonna teach you how to make *nice websites*. (Using React, Next.js, react-spring, ChakraUI, etc.)",
  entities: {
    urls: [
      {
        url: 'https://www.youtube.com/channel/UCE7h4of6ywpAG87KXHV6UrQ',
        expanded_url: 'https://www.youtube.com/channel/UCE7h4of6ywpAG87KXHV6UrQ',
      },
    ],
  },
} as unknown) as Status;

const TweetBoxAd: React.FC = ({ ...restProps }) => {
  return (
    <TweetBox
      border="2px dashed"
      header={
        <TweetBoxHeader
          created_at={new Date().toISOString()}
          imageUrl="/profile.jpg"
          name="Tom Dohnal"
          screenName="tom_dohnal"
        />
      }
      content={
        <TweetBoxContent
          tweet={{
            ...adTweet,
            linkDescription:
              'Learn how to create rich websites like TwitterFOMO on my YouTube channel.',
            linkTitle: 'Learn how to create nice websites',
            linkImageUrl: '/youtube-preview.jpg',
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
          Don&apos;t get fooled. This isn&apos;t a real tweet 😇
        </Text>
      }
      href="https://www.youtube.com/channel/UCE7h4of6ywpAG87KXHV6UrQ"
      {...restProps}
    />
  );
};

export default TweetBoxAd;
