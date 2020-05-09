import React, { ReactNode, memo } from 'react';
import { FullUser, MediaEntity, Status } from 'twitter-d';
import reactStringReplace from 'react-string-replace';
import escapeStringRegexp from 'escape-string-regexp';
import { Box, Img, Text, AspectRatio, useTheme, Link } from '@chakra-ui/core';
import unescape from 'unescape';

import { useSpring, animated } from 'react-spring';
import { useIsHovered } from '../utils';
import TweetBoxRetweet from './TweetBoxRetweet';
import TweetBoxRetweetHeader from './TweetBoxRetweetHeader';

const AnimatedImage = animated(Img);
const AnimatedBox = animated(Box);

const parseText = (tweet: Status): ReactNode => {
  const imageUrlsRegExp = new RegExp(
    `(${(tweet.extended_entities?.media || [])
      .map((image) => escapeStringRegexp(image.url))
      .join('|')})`,
    'g',
  );

  const textWithReplacedImages = tweet.full_text.replace(imageUrlsRegExp, '');

  const textWithReplacedRetweetUrls = textWithReplacedImages.replace(
    tweet?.quoted_status_permalink?.url || '',
    '',
  );

  const urlsRegExp = new RegExp(
    `(${(tweet.entities.urls || []).map((url) => escapeStringRegexp(url.url)).join('|')})`,
    'g',
  );

  const textWithReplacedUrls = tweet.entities.urls?.length
    ? reactStringReplace(textWithReplacedRetweetUrls, urlsRegExp, (_, i) => {
        return (
          <Link
            position="relative"
            zIndex={1}
            color="primary"
            href={tweet.entities.urls![Math.floor(i / 2)].expanded_url}
            key={i}
            _hover={{ textDecoration: 'underline' }}
            isExternal
          >
            {tweet.entities.urls![Math.floor(i / 2)].display_url}
          </Link>
        );
      })
    : [textWithReplacedRetweetUrls];

  return textWithReplacedUrls.map((text) => {
    if (typeof text === 'string') {
      return unescape(text);
    }

    return text;
  });
};

const TwitterImages: React.FC<{ images: MediaEntity[] }> = ({ images }) => {
  if (images.length === 1) {
    return (
      <Img
        w="100%"
        src={`${images[0].media_url_https}?name=small`}
        alt="Tweet image"
        objectFit="cover"
      />
    );
  }

  if (images.length === 2) {
    return (
      <Box h={0} pb="58%" pos="relative" zIndex={0}>
        <Img
          src={`${images[0].media_url_https}?name=small`}
          alt="Tweet image"
          objectFit="cover"
          pos="absolute"
          top={0}
          left={0}
          height="100%"
          width="50%"
          borderRight="2px solid"
          borderRightColor="white"
        />
        <Img
          src={`${images[1].media_url_https}?name=small`}
          alt="Tweet image"
          objectFit="cover"
          pos="absolute"
          top={0}
          left="50%"
          height="100%"
          width="50%"
          borderLeft="2px solid"
          borderLeftColor="white"
        />
      </Box>
    );
  }

  if (images.length === 3) {
    return (
      <Box h={0} pb="58%" pos="relative">
        <Img
          src={`${images[0].media_url_https}?name=small`}
          alt="Tweet image"
          objectFit="cover"
          pos="absolute"
          top={0}
          left={0}
          height="100%"
          width="50%"
          borderRight="2px solid"
          borderRightColor="white"
        />
        <Img
          src={`${images[1].media_url_https}?name=small`}
          alt="Tweet image"
          objectFit="cover"
          pos="absolute"
          top={0}
          left="50%"
          height="50%"
          width="50%"
          borderLeft="2px solid"
          borderLeftColor="white"
          borderBottom="2px solid"
          borderBottomColor="white"
        />
        <Img
          src={`${images[2].media_url_https}?name=small`}
          alt="Tweet image"
          objectFit="cover"
          pos="absolute"
          top="50%"
          left="50%"
          height="50%"
          width="50%"
          borderRight="2px solid"
          borderRightColor="white"
          borderTop="2px solid"
          borderTopColor="white"
        />
      </Box>
    );
  }

  return (
    <Box h={0} pb="58%" pos="relative">
      <Img
        src={`${images[0].media_url_https}?name=small`}
        alt="Tweet image"
        objectFit="cover"
        pos="absolute"
        top={0}
        left={0}
        height="50%"
        width="50%"
        borderRight="2px solid"
        borderRightColor="white"
        borderBottom="2px solid"
        borderBottomColor="white"
      />
      <Img
        src={`${images[1].media_url_https}?name=small`}
        alt="Tweet image"
        objectFit="cover"
        pos="absolute"
        top={0}
        left="50%"
        height="50%"
        width="50%"
        borderLeft="2px solid"
        borderLeftColor="white"
        borderBottom="2px solid"
        borderBottomColor="white"
      />
      <Img
        src={`${images[2].media_url_https}?name=small`}
        alt="Tweet image"
        objectFit="cover"
        pos="absolute"
        top="50%"
        left={0}
        height="50%"
        width="50%"
        borderRight="2px solid"
        borderRightColor="white"
        borderTop="2px solid"
        borderTopColor="white"
      />
      <Img
        src={`${images[3].media_url_https}?name=small`}
        alt="Tweet image"
        objectFit="cover"
        pos="absolute"
        top="50%"
        left="50%"
        height="50%"
        width="50%"
        borderLeft="2px solid"
        borderLeftColor="white"
        borderTop="2px solid"
        borderTopColor="white"
      />
    </Box>
  );
};

const TwitterGif: React.FC<{ gif: MediaEntity }> = ({ gif }) => {
  if (!gif.video_info) {
    return null;
  }

  return (
    <AspectRatio
      ratio={(gif.video_info.aspect_ratio?.[0] ?? 16) / (gif.video_info.aspect_ratio?.[1] ?? 9)}
    >
      <Box as="video" controls objectFit="contain">
        <source
          src={gif.video_info?.variants?.[0].url}
          type={gif.video_info?.variants?.[0].content_type}
        />
      </Box>
    </AspectRatio>
  );
};

const TwitterVideo: React.FC<{ video: MediaEntity }> = ({ video }) => {
  if (!video.video_info) {
    return null;
  }

  const middleVariant = (video.video_info?.variants ?? []).slice().sort((a, b) => {
    return (a?.bitrate ?? 0) - (b?.bitrate ?? 0);
  })[1];

  if (!middleVariant) {
    return null;
  }

  const ratio =
    (video.video_info.aspect_ratio?.[0] ?? 16) / (video.video_info.aspect_ratio?.[1] ?? 9);

  if (ratio > 1) {
    return (
      <AspectRatio ratio={ratio}>
        <Box as="video" controls objectFit="contain">
          <source src={middleVariant.url} type={middleVariant.content_type} />
        </Box>
      </AspectRatio>
    );
  }

  return (
    <Box h={0} pb="100%" pos="relative">
      <Box
        as="video"
        controls
        objectFit="contain"
        pos="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
        bgColor="black"
      >
        <source src={middleVariant.url} type={middleVariant.content_type} />
      </Box>
    </Box>
  );
};

const TwitterLinkPreview: React.FC<{
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}> = ({ title, description, imageUrl, url }) => {
  const [isHovered, listeners] = useIsHovered();
  const theme = useTheme();
  const imageAnimatedValues = useSpring({ transform: isHovered ? 'scale(1.05)' : 'scale(1)' });
  const textAnimatedValues = useSpring({
    backgroundColor: isHovered ? theme.colors.gray['50'] : '#fff',
  });

  return (
    <Box
      as="a"
      display="block"
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      border="1px solid"
      borderColor="gray.200"
      {...listeners}
    >
      <AspectRatio overflow="hidden" ratio={16 / 9} borderBottom="1px solid" borderColor="gray.200">
        <AnimatedImage
          src={imageUrl}
          alt="Link image preview"
          objectFit="cover"
          style={imageAnimatedValues}
        />
      </AspectRatio>
      <AnimatedBox p={2} style={textAnimatedValues}>
        <Text color="textSecondary" fontSize="sm" fontWeight={600} noOfLines={2}>
          {title}
        </Text>
        <Text color="textSecondary" fontSize="sm" noOfLines={2}>
          {description}
        </Text>
      </AnimatedBox>
    </Box>
  );
};

const TweetBoxContent: React.FC<{
  tweet: Status & {
    linkTitle?: string;
    linkDescription?: string;
    linkImageUrl?: string;
  };
}> = memo(function TweetBoxContent({ tweet }) {
  const parsedText = parseText(tweet);
  const user: FullUser = tweet.user as FullUser;

  return (
    <>
      <Text fontSize="lg" whiteSpace="pre-wrap">
        {parsedText}
      </Text>
      {!!tweet?.extended_entities?.media?.length &&
        tweet?.extended_entities?.media[0].type === 'photo' && (
          <Box
            mt={4}
            as={Link}
            display="block"
            href={`https://twitter.com/${user.screen_name}/status/${tweet.id_str}`}
            isExternal
          >
            <TwitterImages images={tweet?.extended_entities?.media} />
          </Box>
        )}
      {!!tweet?.extended_entities?.media?.length &&
        tweet?.extended_entities?.media[0].type === 'animated_gif' && (
          <Box mt={4}>
            <TwitterGif gif={tweet?.extended_entities?.media[0]} />
          </Box>
        )}
      {!!tweet?.extended_entities?.media?.length &&
        tweet?.extended_entities?.media[0].type === 'video' && (
          <Box mt={4}>
            <TwitterVideo video={tweet?.extended_entities?.media[0]} />
          </Box>
        )}
      {!tweet?.extended_entities?.media?.length &&
        tweet.linkTitle &&
        tweet.linkDescription &&
        tweet.linkImageUrl &&
        !tweet.quoted_status &&
        tweet.entities.urls?.length === 1 && (
          <Box mt={4} pos="relative" zIndex={1}>
            <TwitterLinkPreview
              title={tweet.linkTitle}
              description={tweet.linkDescription}
              imageUrl={tweet.linkImageUrl}
              url={tweet.entities.urls?.[0].expanded_url as string}
            />
          </Box>
        )}
      {tweet.quoted_status && (
        <Box mt={4} pos="relative" zIndex={1}>
          <TweetBoxRetweet
            header={
              <TweetBoxRetweetHeader
                created_at={tweet.quoted_status.created_at}
                imageUrl={(tweet.quoted_status.user as FullUser).profile_image_url_https}
                name={(tweet.quoted_status.user as FullUser).name}
                screenName={(tweet.quoted_status.user as FullUser).screen_name}
              />
            }
            content={
              <TweetBoxContent
                tweet={{
                  ...tweet.quoted_status,
                  linkTitle: tweet.linkTitle,
                  linkDescription: tweet.linkDescription,
                  linkImageUrl: tweet.linkImageUrl,
                }}
              />
            }
            href={tweet.quoted_status_permalink?.expanded as string}
          />
        </Box>
      )}
    </>
  );
});

export default TweetBoxContent;
