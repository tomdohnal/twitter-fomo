import React from 'react';
import TweetBox from '../../components/TweetBox';
import { Flex } from '@chakra-ui/core';

function Trying() {
  return (
    <Flex justifyContent="center" mt={10}>
      <TweetBox
        accountName="Johnny Walker"
        accountUrlName="johnnyW"
        profileImageUrl="https://pbs.twimg.com/profile_images/1245834357866143757/XofUpsXN_400x400.jpg"
        favoritesCount={2344}
        retweetsCount={322}
        text="Auctor mi odio purus purus sit euismod lectus. Suspendisse a a malesuada lobortis ut elit nullam. Urna porttitor elementum, diam porta cras."
        createdAt="2020-08-04T10:34:21Z"
      />
    </Flex>
  );
}

export default Trying;
