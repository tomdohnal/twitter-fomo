/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Wrap, Box, Stack, Input, Button } from '@chakra-ui/core';
import CheckboxButton from '../components/CheckboxButton';
import ContentContainer from '../components/ContentContainer';
import GroupedRadioButtons from '../components/GroupedRadioButtons';
import CellPhoneImage from '../components/CellPhoneImage';
import MailboxImage from '../components/MailboxImage';
import BalloonImage from '../components/BalloonImage';
import MountainImage from '../components/MountainImage';
import EnvelopeImage from '../components/EnvelopeImage';
import TabletImage from '../components/TabletImage';
import TweetBox from '../components/TweetBox';
import TweetBoxHeader from '../components/TweetBoxHeader';
import TweetBoxRetweetHeader from '../components/TweetBoxRetweetHeader';
import TweetBoxActions from '../components/TweetBoxActions';

const Components = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [radioValue, setRadioValue] = useState('vue');
  const [inputValue, setInputValue] = useState('');

  return (
    <ContentContainer>
      {/* <Stack spacing={8}>
        <Wrap spacing={4}>
          <CheckboxButton isChecked={isChecked} onCheck={setIsChecked}>
            Checkbox
          </CheckboxButton>
          <CheckboxButton isChecked={isChecked2} onCheck={setIsChecked2}>
            Checkbox
          </CheckboxButton>
        </Wrap>
        <Box>
          <GroupedRadioButtons
            value={radioValue}
            setValue={setRadioValue}
            items={[
              {
                value: 'react',
                label: 'React',
              },
              {
                value: 'vue',
                label: 'Vue',
              },
              {
                value: 'angular',
                label: 'Angular',
              },
            ]}
          />
          Radio value: {radioValue}
        </Box>
        <Box>
          <Wrap>
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
              size="sm"
            />
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
            />
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
              size="lg"
            />
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
              size="xl"
            />
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
              size="2xl"
            />
          </Wrap>
          Input value: {inputValue}
        </Box>
        <Wrap>
          <Button size="sm">Welcome</Button>
          <Button>Welcome</Button>
          <Button size="lg">Welcome</Button>
          <Button size="xl">Welcome</Button>
          <Button size="2xl">Welcome</Button>
        </Wrap>
      </Stack>
      <Box pl="400px">
        <CellPhoneImage />
      </Box> */}
      {/* <Box pl="400px" mt="200px">
        <MailboxImage />
      </Box> */}
      {/* <Box pl="400px" mt="200px">
        <BalloonImage />
      </Box> */}
      {/* <Box pl="200px" mt="200px">
        <MountainImage />
      </Box> */}
      {/* <Box pl="200px" mt="200px">
        <EnvelopeImage />
      </Box> */}
      {/* <Box pl="200px" mt="200px">
        <TabletImage />
      </Box> */}
      {/* <Box pl="200px" mt="200px">
        <TweetBox
          tweet={{
            created_at: 'Sat Sep 26 19:07:01 +0000 2020',
            id: 1309932507245219800,
            id_str: '1309932507245219840',
            full_text: 'ffasda\nhttps://t.co/0ajCCqVNQw https://t.co/1PAC1ahQ9t',
            truncated: false,
            display_text_range: [0, 30],
            entities: {
              hashtags: [],
              symbols: [],
              user_mentions: [],
              urls: [
                {
                  url: 'https://t.co/0ajCCqVNQw',
                  expanded_url: 'http://google.cz',
                  display_url: 'google.cz',
                  indices: [7, 30],
                },
              ],
              media: [
                {
                  id: 1309932318182772700,
                  id_str: '1309932318182772736',
                  indices: [31, 54],
                  media_url: 'http://pbs.twimg.com/media/Ei3QgMkWkAAeDv9.png',
                  media_url_https: 'https://pbs.twimg.com/media/Ei3QgMkWkAAeDv9.png',
                  url: 'https://t.co/1PAC1ahQ9t',
                  display_url: 'pic.twitter.com/1PAC1ahQ9t',
                  expanded_url:
                    'https://twitter.com/Testacc39562769/status/1309932507245219840/photo/1',
                  type: 'photo',
                  sizes: {
                    large: { w: 214, h: 256, resize: 'fit' },
                    small: { w: 214, h: 256, resize: 'fit' },
                    medium: { w: 214, h: 256, resize: 'fit' },
                    thumb: { w: 150, h: 150, resize: 'crop' },
                  },
                },
              ],
            },
            extended_entities: {
              media: [
                {
                  id: 1309932318182772700,
                  id_str: '1309932318182772736',
                  indices: [31, 54],
                  media_url: 'http://pbs.twimg.com/media/Ei3QgMkWkAAeDv9.png',
                  media_url_https: 'https://pbs.twimg.com/media/Ei3QgMkWkAAeDv9.png',
                  url: 'https://t.co/1PAC1ahQ9t',
                  display_url: 'pic.twitter.com/1PAC1ahQ9t',
                  expanded_url:
                    'https://twitter.com/Testacc39562769/status/1309932507245219840/photo/1',
                  type: 'photo',
                  sizes: {
                    large: { w: 214, h: 256, resize: 'fit' },
                    small: { w: 214, h: 256, resize: 'fit' },
                    medium: { w: 214, h: 256, resize: 'fit' },
                    thumb: { w: 150, h: 150, resize: 'crop' },
                  },
                },
                {
                  id: 1309932452136267800,
                  id_str: '1309932452136267778',
                  indices: [31, 54],
                  media_url: 'http://pbs.twimg.com/media/Ei3Qn_lWsAI4wZs.jpg',
                  media_url_https: 'https://pbs.twimg.com/media/Ei3Qn_lWsAI4wZs.jpg',
                  url: 'https://t.co/1PAC1ahQ9t',
                  display_url: 'pic.twitter.com/1PAC1ahQ9t',
                  expanded_url:
                    'https://twitter.com/Testacc39562769/status/1309932507245219840/photo/1',
                  type: 'photo',
                  sizes: {
                    thumb: { w: 150, h: 150, resize: 'crop' },
                    large: { w: 701, h: 840, resize: 'fit' },
                    small: { w: 567, h: 680, resize: 'fit' },
                    medium: { w: 701, h: 840, resize: 'fit' },
                  },
                },
              ],
            },
            source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
            in_reply_to_status_id: null,
            in_reply_to_status_id_str: null,
            in_reply_to_user_id: null,
            in_reply_to_user_id_str: null,
            in_reply_to_screen_name: null,
            user: {
              id: 1309931349151821800,
              id_str: '1309931349151821824',
              name: 'Test account',
              screen_name: 'Testacc39562769',
              location: '',
              description: '',
              url: null,
              entities: { description: { urls: [] } },
              protected: false,
              followers_count: 0,
              friends_count: 0,
              listed_count: 0,
              created_at: 'Sat Sep 26 19:02:38 +0000 2020',
              favourites_count: 0,
              utc_offset: null,
              time_zone: null,
              geo_enabled: false,
              verified: false,
              statuses_count: 1,
              lang: null,
              contributors_enabled: false,
              is_translator: false,
              is_translation_enabled: false,
              profile_background_color: 'F5F8FA',
              profile_background_image_url: null,
              profile_background_image_url_https: null,
              profile_background_tile: false,
              profile_image_url:
                'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
              profile_image_url_https:
                'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
              profile_link_color: '1DA1F2',
              profile_sidebar_border_color: 'C0DEED',
              profile_sidebar_fill_color: 'DDEEF6',
              profile_text_color: '333333',
              profile_use_background_image: true,
              has_extended_profile: true,
              default_profile: true,
              default_profile_image: true,
              following: null,
              follow_request_sent: null,
              notifications: null,
              translator_type: 'none',
            },
            geo: null,
            coordinates: null,
            place: null,
            contributors: null,
            is_quote_status: false,
            retweet_count: 0,
            favorite_count: 0,
            favorited: false,
            retweeted: false,
            possibly_sensitive: false,
            possibly_sensitive_appealable: false,
            lang: 'cy',
            _headers: {},
          }}
        />
      </Box> */}
      <Stack direction="column" spacing={6} mt={{ base: 6, md: 12 }} p={24} maxW="600px">
        {/* <TweetBox
          tweet={{
            created_at: 'Sun Sep 27 09:28:50 +0000 2020',
            id: 1310149387922927600,
            id_str: '1310149387922927616',
            full_text: 'test 6 https://t.co/MNq8t7Zzhp',
            truncated: false,
            display_text_range: [0, 6],
            entities: {
              hashtags: [],
              symbols: [],
              user_mentions: [],
              urls: [],
              media: [
                {
                  id: 1310149379664343000,
                  id_str: '1310149379664343040',
                  indices: [7, 30],
                  media_url: 'http://pbs.twimg.com/tweet_video_thumb/Ei6V61mXcAALTTa.jpg',
                  media_url_https: 'https://pbs.twimg.com/tweet_video_thumb/Ei6V61mXcAALTTa.jpg',
                  url: 'https://t.co/MNq8t7Zzhp',
                  display_url: 'pic.twitter.com/MNq8t7Zzhp',
                  expanded_url:
                    'https://twitter.com/Testacc39562769/status/1310149387922927616/photo/1',
                  type: 'photo',
                  sizes: {
                    thumb: { w: 150, h: 150, resize: 'crop' },
                    large: { w: 498, h: 248, resize: 'fit' },
                    small: { w: 498, h: 248, resize: 'fit' },
                    medium: { w: 498, h: 248, resize: 'fit' },
                  },
                },
              ],
            },
            extended_entities: {
              media: [
                {
                  id: 1310149379664343000,
                  id_str: '1310149379664343040',
                  indices: [7, 30],
                  media_url: 'http://pbs.twimg.com/tweet_video_thumb/Ei6V61mXcAALTTa.jpg',
                  media_url_https: 'https://pbs.twimg.com/tweet_video_thumb/Ei6V61mXcAALTTa.jpg',
                  url: 'https://t.co/MNq8t7Zzhp',
                  display_url: 'pic.twitter.com/MNq8t7Zzhp',
                  expanded_url:
                    'https://twitter.com/Testacc39562769/status/1310149387922927616/photo/1',
                  type: 'animated_gif',
                  sizes: {
                    thumb: { w: 150, h: 150, resize: 'crop' },
                    large: { w: 498, h: 248, resize: 'fit' },
                    small: { w: 498, h: 248, resize: 'fit' },
                    medium: { w: 498, h: 248, resize: 'fit' },
                  },
                  video_info: {
                    aspect_ratio: [249, 124],
                    variants: [
                      {
                        bitrate: 0,
                        content_type: 'video/mp4',
                        url: 'https://video.twimg.com/tweet_video/Ei6V61mXcAALTTa.mp4',
                      },
                    ],
                  },
                },
              ],
            },
            source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
            in_reply_to_status_id: null,
            in_reply_to_status_id_str: null,
            in_reply_to_user_id: null,
            in_reply_to_user_id_str: null,
            in_reply_to_screen_name: null,
            user: {
              id: 1309931349151821800,
              id_str: '1309931349151821824',
              name: 'Test account',
              screen_name: 'Testacc39562769',
              location: '',
              description: '',
              url: null,
              entities: { description: { urls: [] } },
              protected: false,
              followers_count: 0,
              friends_count: 0,
              listed_count: 0,
              created_at: 'Sat Sep 26 19:02:38 +0000 2020',
              favourites_count: 0,
              utc_offset: null,
              time_zone: null,
              geo_enabled: false,
              verified: false,
              statuses_count: 6,
              lang: null,
              contributors_enabled: false,
              is_translator: false,
              is_translation_enabled: false,
              profile_background_color: 'F5F8FA',
              profile_background_image_url: null,
              profile_background_image_url_https: null,
              profile_background_tile: false,
              profile_image_url:
                'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
              profile_image_url_https:
                'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
              profile_link_color: '1DA1F2',
              profile_sidebar_border_color: 'C0DEED',
              profile_sidebar_fill_color: 'DDEEF6',
              profile_text_color: '333333',
              profile_use_background_image: true,
              has_extended_profile: true,
              default_profile: true,
              default_profile_image: true,
              following: null,
              follow_request_sent: null,
              notifications: null,
              translator_type: 'none',
            },
            geo: null,
            coordinates: null,
            place: null,
            contributors: null,
            is_quote_status: false,
            retweet_count: 0,
            favorite_count: 0,
            favorited: false,
            retweeted: false,
            possibly_sensitive: false,
            possibly_sensitive_appealable: false,
            lang: 'en',
            _headers: {},
          }}
        /> */}
        <TweetBox
          tweet={{
            created_at: 'Fri Oct 02 12:22:27 +0000 2020',
            id: 1312005022142652400,
            id_str: '1312005022142652418',
            full_text: 'Yes! https://t.co/9e3a5nQ17p',
            truncated: false,
            display_text_range: [0, 4],
            entities: {
              hashtags: [],
              symbols: [],
              user_mentions: [],
              urls: [
                {
                  url: 'https://t.co/9e3a5nQ17p',
                  expanded_url: 'https://twitter.com/stanwawrinka/status/1310524147785756672',
                  display_url: 'twitter.com/stanwawrinka/s…',
                  indices: [5, 28],
                },
              ],
            },
            source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
            in_reply_to_status_id: null,
            in_reply_to_status_id_str: null,
            in_reply_to_user_id: null,
            in_reply_to_user_id_str: null,
            in_reply_to_screen_name: null,
            user: {
              id: 1309931349151821800,
              id_str: '1309931349151821824',
              name: 'Test account',
              screen_name: 'Testacc39562769',
              location: '',
              description: '',
              url: null,
              entities: { description: { urls: [] } },
              protected: false,
              followers_count: 0,
              friends_count: 0,
              listed_count: 0,
              created_at: 'Sat Sep 26 19:02:38 +0000 2020',
              favourites_count: 0,
              utc_offset: null,
              time_zone: null,
              geo_enabled: false,
              verified: false,
              statuses_count: 13,
              lang: null,
              contributors_enabled: false,
              is_translator: false,
              is_translation_enabled: false,
              profile_background_color: 'F5F8FA',
              profile_background_image_url: null,
              profile_background_image_url_https: null,
              profile_background_tile: false,
              profile_image_url:
                'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
              profile_image_url_https:
                'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
              profile_link_color: '1DA1F2',
              profile_sidebar_border_color: 'C0DEED',
              profile_sidebar_fill_color: 'DDEEF6',
              profile_text_color: '333333',
              profile_use_background_image: true,
              has_extended_profile: true,
              default_profile: true,
              default_profile_image: true,
              following: null,
              follow_request_sent: null,
              notifications: null,
              translator_type: 'none',
            },
            geo: null,
            coordinates: null,
            place: null,
            contributors: null,
            is_quote_status: true,
            quoted_status_id: 1310524147785756700,
            quoted_status_id_str: '1310524147785756672',
            quoted_status_permalink: {
              url: 'https://t.co/9e3a5nQ17p',
              expanded: 'https://twitter.com/stanwawrinka/status/1310524147785756672',
              display: 'twitter.com/stanwawrinka/s…',
            },
            quoted_status: {
              created_at: 'Mon Sep 28 10:17:59 +0000 2020',
              id: 1310524147785756700,
              id_str: '1310524147785756672',
              full_text:
                'He’s a great example of what a Champion looks like on and off the court ! Lot of respect my friend 🙏🏻✊🏻💥❤️ #legend #respect #champion #friend #rival https://t.co/id71ESpXBH',
              truncated: false,
              display_text_range: [0, 148],
              entities: {
                hashtags: [
                  { text: 'legend', indices: [107, 114] },
                  { text: 'respect', indices: [115, 123] },
                  { text: 'champion', indices: [124, 133] },
                  { text: 'friend', indices: [134, 141] },
                  { text: 'rival', indices: [142, 148] },
                ],
                symbols: [],
                user_mentions: [],
                urls: [],
                media: [
                  {
                    id: 1310524140647051300,
                    id_str: '1310524140647051264',
                    indices: [149, 172],
                    media_url: 'http://pbs.twimg.com/media/Ei_qwzDXcAAKkLi.jpg',
                    media_url_https: 'https://pbs.twimg.com/media/Ei_qwzDXcAAKkLi.jpg',
                    url: 'https://t.co/id71ESpXBH',
                    display_url: 'pic.twitter.com/id71ESpXBH',
                    expanded_url:
                      'https://twitter.com/stanwawrinka/status/1310524147785756672/photo/1',
                    type: 'photo',
                    sizes: {
                      small: { w: 680, h: 453, resize: 'fit' },
                      thumb: { w: 150, h: 150, resize: 'crop' },
                      large: { w: 2048, h: 1364, resize: 'fit' },
                      medium: { w: 1200, h: 799, resize: 'fit' },
                    },
                  },
                ],
              },
              extended_entities: {
                media: [
                  {
                    id: 1310524140647051300,
                    id_str: '1310524140647051264',
                    indices: [149, 172],
                    media_url: 'http://pbs.twimg.com/media/Ei_qwzDXcAAKkLi.jpg',
                    media_url_https: 'https://pbs.twimg.com/media/Ei_qwzDXcAAKkLi.jpg',
                    url: 'https://t.co/id71ESpXBH',
                    display_url: 'pic.twitter.com/id71ESpXBH',
                    expanded_url:
                      'https://twitter.com/stanwawrinka/status/1310524147785756672/photo/1',
                    type: 'photo',
                    sizes: {
                      small: { w: 680, h: 453, resize: 'fit' },
                      thumb: { w: 150, h: 150, resize: 'crop' },
                      large: { w: 2048, h: 1364, resize: 'fit' },
                      medium: { w: 1200, h: 799, resize: 'fit' },
                    },
                  },
                  {
                    id: 1310524140651241500,
                    id_str: '1310524140651241473',
                    indices: [149, 172],
                    media_url: 'http://pbs.twimg.com/media/Ei_qwzEXYAEIpIJ.jpg',
                    media_url_https: 'https://pbs.twimg.com/media/Ei_qwzEXYAEIpIJ.jpg',
                    url: 'https://t.co/id71ESpXBH',
                    display_url: 'pic.twitter.com/id71ESpXBH',
                    expanded_url:
                      'https://twitter.com/stanwawrinka/status/1310524147785756672/photo/1',
                    type: 'photo',
                    sizes: {
                      small: { w: 680, h: 454, resize: 'fit' },
                      thumb: { w: 150, h: 150, resize: 'crop' },
                      large: { w: 2048, h: 1366, resize: 'fit' },
                      medium: { w: 1200, h: 800, resize: 'fit' },
                    },
                  },
                ],
              },
              source:
                '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
              in_reply_to_status_id: null,
              in_reply_to_status_id_str: null,
              in_reply_to_user_id: null,
              in_reply_to_user_id_str: null,
              in_reply_to_screen_name: null,
              user: {
                id: 65187067,
                id_str: '65187067',
                name: 'Stanislas Wawrinka',
                screen_name: 'stanwawrinka',
                location: 'Lausanne',
                description:
                  'https://t.co/iMxROTOAyV . https://t.co/9mk2NfVUAq . snapchat : stanwaw',
                url: 'https://t.co/yTmgeHoHJT',
                entities: {
                  url: {
                    urls: [
                      {
                        url: 'https://t.co/yTmgeHoHJT',
                        expanded_url: 'http://www.stanwawrinka.com',
                        display_url: 'stanwawrinka.com',
                        indices: [0, 23],
                      },
                    ],
                  },
                  description: {
                    urls: [
                      {
                        url: 'https://t.co/iMxROTOAyV',
                        expanded_url: 'http://www.facebook.com/StanWawrinkaOfficial',
                        display_url: 'facebook.com/StanWawrinkaOf…',
                        indices: [0, 23],
                      },
                      {
                        url: 'https://t.co/9mk2NfVUAq',
                        expanded_url: 'http://Instagram.com/stanwawrinka85',
                        display_url: 'Instagram.com/stanwawrinka85',
                        indices: [26, 49],
                      },
                    ],
                  },
                },
                protected: false,
                followers_count: 1731738,
                friends_count: 588,
                listed_count: 4704,
                created_at: 'Wed Aug 12 22:40:34 +0000 2009',
                favourites_count: 181,
                utc_offset: null,
                time_zone: null,
                geo_enabled: true,
                verified: true,
                statuses_count: 9004,
                lang: null,
                contributors_enabled: false,
                is_translator: false,
                is_translation_enabled: false,
                profile_background_color: '131516',
                profile_background_image_url: 'http://abs.twimg.com/images/themes/theme14/bg.gif',
                profile_background_image_url_https:
                  'https://abs.twimg.com/images/themes/theme14/bg.gif',
                profile_background_tile: true,
                profile_image_url:
                  'http://pbs.twimg.com/profile_images/999954463044636673/R4iDRy_X_normal.jpg',
                profile_image_url_https:
                  'https://pbs.twimg.com/profile_images/999954463044636673/R4iDRy_X_normal.jpg',
                profile_banner_url: 'https://pbs.twimg.com/profile_banners/65187067/1439392509',
                profile_link_color: '009999',
                profile_sidebar_border_color: 'EEEEEE',
                profile_sidebar_fill_color: 'EFEFEF',
                profile_text_color: '333333',
                profile_use_background_image: true,
                has_extended_profile: true,
                default_profile: false,
                default_profile_image: false,
                following: null,
                follow_request_sent: null,
                notifications: null,
                translator_type: 'none',
              },
              geo: null,
              coordinates: null,
              place: null,
              contributors: null,
              is_quote_status: false,
              retweet_count: 553,
              favorite_count: 7713,
              favorited: false,
              retweeted: false,
              possibly_sensitive: false,
              possibly_sensitive_appealable: false,
              lang: 'en',
            },
            retweet_count: 0,
            favorite_count: 0,
            favorited: false,
            retweeted: false,
            possibly_sensitive: false,
            possibly_sensitive_appealable: false,
            lang: 'und',
            _headers: {},
          }}
          header={
            // <TweetBoxHeader
            //   created_at="Sun Sep 27 09:52:31 +0000 2020"
            //   imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
            //   name="Tom Dohnal"
            //   screenName="screenname"
            // />
            <TweetBoxRetweetHeader
              created_at="Sun Sep 27 09:52:31 +0000 2020"
              imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
              name="Tom DohnalTom DohnalTom Dohnal"
              screenName="screenname"
            />
          }
          actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
        />
      </Stack>
    </ContentContainer>
  );
};

export default Components;
