import React, { ReactNode } from 'react';
import { MediaEntity, Status } from 'twitter-d';
import reactStringReplace from 'react-string-replace';
import escapeStringRegexp from 'escape-string-regexp';
import { Box, Image, Text, AspectRatio, useTheme, Link } from '@chakra-ui/core';
import { useIsHovered } from '../utils';
import { useSpring, animated } from 'react-spring';

const AnimatedBox = animated(Box);
const AnimatedImage = animated(Image);

// const trimRanges = ({
//   ranges,
//   text,
//   offset = 0,
// }: {
//   ranges: [number, number][];
//   text: string;
//   offset?: number;
// }): string => {
//   if (!ranges.length) {
//     return text;
//   }

//   const [currentRange, ...remainingRanges] = ranges;
//   const parsedText = `${text.slice(0, currentRange[0] - offset)}${text.slice(
//     currentRange[1] - offset + 1,
//   )}`;

//   return trimRanges({
//     ranges: remainingRanges,
//     text: parsedText,
//     offset: offset + (currentRange[1] - currentRange[0]) + 1,
//   });
// };

// const replaceUrls = ({
//   text,
//   urls,
//   offset: initialOffset = 0,
// }: {
//   text: string;
//   urls: UrlEntity[];
//   offset?: number;
// }): ReactNode => {
//   let offset = 0;
//   const result: ReactNode[] = [];

//   for (let i = 0; i < urls.length; i++) {
//     result.push(text.slice(offset, urls[i].indices![0]));
//     result.push(text.slice(urls[i].indices![0], urls[i].indices![1]));
//     [, offset] = urls[i].indices!;
//   }

//   result.push(text.slice(urls[urls.length - 1].indices![1]));

//   return result;
// };

const parseText = (tweet: Status): ReactNode[] => {
  const imageUrlsRegExp = new RegExp(
    `(${(tweet.extended_entities?.media || [])
      .map(image => escapeStringRegexp(image.url))
      .join('|')})`,
    'g',
  );

  const textWithReplacedImages = tweet.full_text.replace(imageUrlsRegExp, '');

  const urlsRegExp = new RegExp(
    `(${(tweet.entities.urls || []).map(url => escapeStringRegexp(url.url)).join('|')})`,
    'g',
  );

  const textWithReplacedUrls = reactStringReplace(textWithReplacedImages, urlsRegExp, (_, i) => {
    return (
      <Link
        position="relative"
        zIndex={1}
        color="primary"
        href={tweet.entities.urls![Math.floor(i / 2)].expanded_url}
        key={i}
      >
        {tweet.entities.urls![Math.floor(i / 2)].display_url}
      </Link>
    );
  });

  return textWithReplacedUrls;
};

const TwitterImages: React.FC<{ images: MediaEntity[] }> = ({ images }) => {
  if (images.length === 1) {
    return (
      <Image src={`${images[0].media_url_https}?name=small`} alt="Tweet image" objectFit="cover" />
    );
  }

  if (images.length === 2) {
    return (
      <Box h={0} pb="58%" pos="relative">
        <Image
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
        <Image
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
        <Image
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
        <Image
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
        <Image
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
      <Image
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
      <Image
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
      <Image
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
      <Image
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

// TODO: 1309156899879821314
const TweetBox: React.FC<{
  tweet: Status & {
    linkTitle?: string;
    linkDescription?: string;
    linkImageUrl?: string;
  };
  header: React.ElementType;
  actions: React.ElementType;
}> = ({ tweet, header, actions }) => {
  const theme = useTheme();
  const [isHovered, listeners] = useIsHovered();
  const animatedValues = useSpring({
    boxShadow: isHovered ? theme.shadows.sm('transparent') : theme.shadows.sm(),
  });

  const parsedText = parseText(tweet);
  return (
    <AnimatedBox
      borderWidth={2}
      borderColor="gray.900"
      bg="white"
      p={6}
      pos="relative"
      style={animatedValues}
      {...listeners}
    >
      <Link
        href={`https://twitter.com/${tweet.user?.screen_name}/status/${tweet.id_str}`}
        rel="noreferrer noopener"
        target="_blank"
        pos="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
      />
      {header}
      <Box mt={4}>
        <Text fontSize="lg">{parsedText}</Text>
        {!!tweet?.extended_entities?.media?.length &&
          tweet?.extended_entities?.media[0].type === 'photo' && (
            <Box mt={6}>
              <TwitterImages images={tweet?.extended_entities?.media} />
            </Box>
          )}
        {!!tweet?.extended_entities?.media?.length &&
          tweet?.extended_entities?.media[0].type === 'animated_gif' && (
            <Box mt={6}>
              <TwitterGif gif={tweet?.extended_entities?.media[0]} />
            </Box>
          )}
        {!!tweet?.extended_entities?.media?.length &&
          tweet?.extended_entities?.media[0].type === 'video' && (
            <Box mt={6}>
              <TwitterVideo video={tweet?.extended_entities?.media[0]} />
            </Box>
          )}
        {!tweet?.extended_entities?.media?.length &&
          tweet.linkTitle &&
          tweet.linkDescription &&
          tweet.linkImageUrl &&
          tweet.entities.urls?.length === 1 && (
            <Box mt={6} pos="relative" zIndex={1}>
              <TwitterLinkPreview
                title={tweet.linkTitle}
                description={tweet.linkDescription}
                imageUrl={tweet.linkImageUrl}
                url={tweet.entities.urls![0].expanded_url as string}
              />
            </Box>
          )}
      </Box>
      {actions}
    </AnimatedBox>
  );
};

export default TweetBox;
