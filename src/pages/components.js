/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Wrap, Box, Stack, Input, Button, Heading } from '@chakra-ui/core';
import CheckboxButton from '../components/CheckboxButton';
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
import TweetBoxContent from '../components/TweetBoxContent';

const tweet = {
  created_at: 'Sun Oct 04 11:04:57 +0000 2020',
  id: 1312710293714239500,
  id_str: '1312710293714239488',
  full_text:
    'this is a simple text tweet this is a simple text tweet this is a simple text tweet this is a simple text tweet this is a simple text tweet this is a simple text tweet this is a simple text tweet this is a simple text tweet',
  truncated: false,
  display_text_range: [0, 223],
  entities: { hashtags: [], symbols: [], user_mentions: [], urls: [] },
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
    statuses_count: 19,
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
  lang: 'en',
  _headers: {},
};

const tweetWithTextRetweet = {
  created_at: 'Sun Oct 04 09:12:15 +0000 2020',
  id: 1312681932178759700,
  id_str: '1312681932178759680',
  full_text: 'je to tak! https://t.co/RpZtD85Bgp',
  truncated: false,
  display_text_range: [0, 10],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [
      {
        url: 'https://t.co/RpZtD85Bgp',
        expanded_url: 'https://twitter.com/okundra/status/963156400770879490',
        display_url: 'twitter.com/okundra/status…',
        indices: [11, 34],
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
    statuses_count: 16,
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
  quoted_status_id: 963156400770879500,
  quoted_status_id_str: '963156400770879490',
  quoted_status_permalink: {
    url: 'https://t.co/RpZtD85Bgp',
    expanded: 'https://twitter.com/okundra/status/963156400770879490',
    display: 'twitter.com/okundra/status…',
  },
  quoted_status: {
    created_at: 'Mon Feb 12 21:02:35 +0000 2018',
    id: 963156400770879500,
    id_str: '963156400770879490',
    full_text:
      '“Je zlem poddat se aktivně nebo pasivně zlu jako jeho nástroj, jeho pozorovatel nebo jeho oběť.”',
    truncated: false,
    display_text_range: [0, 96],
    entities: { hashtags: [], symbols: [], user_mentions: [], urls: [] },
    source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: {
      id: 1945021333,
      id_str: '1945021333',
      name: 'Ondrej Kundra',
      screen_name: 'okundra',
      location: '',
      description: 'Zástupce šéfredaktora týdeníku Respekt / write me at: kundra@respekt.cz',
      url: null,
      entities: { description: { urls: [] } },
      protected: false,
      followers_count: 26356,
      friends_count: 3601,
      listed_count: 178,
      created_at: 'Mon Oct 07 19:23:43 +0000 2013',
      favourites_count: 12251,
      utc_offset: null,
      time_zone: null,
      geo_enabled: false,
      verified: false,
      statuses_count: 17666,
      lang: null,
      contributors_enabled: false,
      is_translator: false,
      is_translation_enabled: false,
      profile_background_color: 'C0DEED',
      profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
      profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
      profile_background_tile: false,
      profile_image_url:
        'http://pbs.twimg.com/profile_images/1173602211483607040/RXk17I9k_normal.jpg',
      profile_image_url_https:
        'https://pbs.twimg.com/profile_images/1173602211483607040/RXk17I9k_normal.jpg',
      profile_banner_url: 'https://pbs.twimg.com/profile_banners/1945021333/1518718115',
      profile_link_color: '1DA1F2',
      profile_sidebar_border_color: 'C0DEED',
      profile_sidebar_fill_color: 'DDEEF6',
      profile_text_color: '333333',
      profile_use_background_image: true,
      has_extended_profile: false,
      default_profile: true,
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
    retweet_count: 23,
    favorite_count: 241,
    favorited: false,
    retweeted: false,
    lang: 'cs',
  },
  retweet_count: 0,
  favorite_count: 0,
  favorited: false,
  retweeted: false,
  possibly_sensitive: false,
  possibly_sensitive_appealable: false,
  lang: 'pl',
  _headers: {},
};

const tweet1Image = {
  created_at: 'Sun Oct 04 11:08:17 +0000 2020',
  id: 1312711130012360700,
  id_str: '1312711130012360706',
  full_text: '1 image https://t.co/RmcgxjdgFW',
  truncated: false,
  display_text_range: [0, 7],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [],
    media: [
      {
        id: 1312711120063471600,
        id_str: '1312711120063471618',
        indices: [8, 31],
        media_url: 'http://pbs.twimg.com/media/EjevzwQWoAIWFHK.jpg',
        media_url_https: 'https://pbs.twimg.com/media/EjevzwQWoAIWFHK.jpg',
        url: 'https://t.co/RmcgxjdgFW',
        display_url: 'pic.twitter.com/RmcgxjdgFW',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711130012360706/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
    ],
  },
  extended_entities: {
    media: [
      {
        id: 1312711120063471600,
        id_str: '1312711120063471618',
        indices: [8, 31],
        media_url: 'http://pbs.twimg.com/media/EjevzwQWoAIWFHK.jpg',
        media_url_https: 'https://pbs.twimg.com/media/EjevzwQWoAIWFHK.jpg',
        url: 'https://t.co/RmcgxjdgFW',
        display_url: 'pic.twitter.com/RmcgxjdgFW',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711130012360706/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
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
    statuses_count: 23,
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
};

const tweet2Images = {
  created_at: 'Sun Oct 04 11:08:49 +0000 2020',
  id: 1312711266989944800,
  id_str: '1312711266989944833',
  full_text: '2 images https://t.co/zFawcaZXYl',
  truncated: false,
  display_text_range: [0, 8],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [],
    media: [
      {
        id: 1312711181094785000,
        id_str: '1312711181094785024',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/Ejev3TnWkAAWL_U.jpg',
        media_url_https: 'https://pbs.twimg.com/media/Ejev3TnWkAAWL_U.jpg',
        url: 'https://t.co/zFawcaZXYl',
        display_url: 'pic.twitter.com/zFawcaZXYl',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711266989944833/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
    ],
  },
  extended_entities: {
    media: [
      {
        id: 1312711181094785000,
        id_str: '1312711181094785024',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/Ejev3TnWkAAWL_U.jpg',
        media_url_https: 'https://pbs.twimg.com/media/Ejev3TnWkAAWL_U.jpg',
        url: 'https://t.co/zFawcaZXYl',
        display_url: 'pic.twitter.com/zFawcaZXYl',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711266989944833/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
      {
        id: 1312711256718049300,
        id_str: '1312711256718049280',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/Ejev7tVWAAA3UC4.jpg',
        media_url_https: 'https://pbs.twimg.com/media/Ejev7tVWAAA3UC4.jpg',
        url: 'https://t.co/zFawcaZXYl',
        display_url: 'pic.twitter.com/zFawcaZXYl',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711266989944833/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
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
    statuses_count: 23,
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
};

const tweet3Images = {
  created_at: 'Sun Oct 04 11:09:10 +0000 2020',
  id: 1312711352524451800,
  id_str: '1312711352524451841',
  full_text: '3 images https://t.co/7HCzQVH2EV',
  truncated: false,
  display_text_range: [0, 8],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [],
    media: [
      {
        id: 1312711307276189700,
        id_str: '1312711307276189704',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/Ejev-prWAAgLJfV.jpg',
        media_url_https: 'https://pbs.twimg.com/media/Ejev-prWAAgLJfV.jpg',
        url: 'https://t.co/7HCzQVH2EV',
        display_url: 'pic.twitter.com/7HCzQVH2EV',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711352524451841/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
    ],
  },
  extended_entities: {
    media: [
      {
        id: 1312711307276189700,
        id_str: '1312711307276189704',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/Ejev-prWAAgLJfV.jpg',
        media_url_https: 'https://pbs.twimg.com/media/Ejev-prWAAgLJfV.jpg',
        url: 'https://t.co/7HCzQVH2EV',
        display_url: 'pic.twitter.com/7HCzQVH2EV',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711352524451841/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
      {
        id: 1312711328491073500,
        id_str: '1312711328491073536',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/Ejev_4tXcAARNTh.jpg',
        media_url_https: 'https://pbs.twimg.com/media/Ejev_4tXcAARNTh.jpg',
        url: 'https://t.co/7HCzQVH2EV',
        display_url: 'pic.twitter.com/7HCzQVH2EV',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711352524451841/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
      {
        id: 1312711344005812200,
        id_str: '1312711344005812224',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/EjewAygXkAAUDLt.jpg',
        media_url_https: 'https://pbs.twimg.com/media/EjewAygXkAAUDLt.jpg',
        url: 'https://t.co/7HCzQVH2EV',
        display_url: 'pic.twitter.com/7HCzQVH2EV',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711352524451841/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
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
    statuses_count: 23,
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
};

const tweet4Images = {
  created_at: 'Sun Oct 04 11:09:28 +0000 2020',
  id: 1312711430135840800,
  id_str: '1312711430135840774',
  full_text: '4 images https://t.co/nvXadaDV2C',
  truncated: false,
  display_text_range: [0, 8],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [],
    media: [
      {
        id: 1312711381100236800,
        id_str: '1312711381100236801',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/EjewC8sXkAETMTp.jpg',
        media_url_https: 'https://pbs.twimg.com/media/EjewC8sXkAETMTp.jpg',
        url: 'https://t.co/nvXadaDV2C',
        display_url: 'pic.twitter.com/nvXadaDV2C',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711430135840774/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
    ],
  },
  extended_entities: {
    media: [
      {
        id: 1312711381100236800,
        id_str: '1312711381100236801',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/EjewC8sXkAETMTp.jpg',
        media_url_https: 'https://pbs.twimg.com/media/EjewC8sXkAETMTp.jpg',
        url: 'https://t.co/nvXadaDV2C',
        display_url: 'pic.twitter.com/nvXadaDV2C',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711430135840774/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
      {
        id: 1312711395893543000,
        id_str: '1312711395893542912',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/EjewDzzXgAAE0uF.jpg',
        media_url_https: 'https://pbs.twimg.com/media/EjewDzzXgAAE0uF.jpg',
        url: 'https://t.co/nvXadaDV2C',
        display_url: 'pic.twitter.com/nvXadaDV2C',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711430135840774/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
      {
        id: 1312711408698765300,
        id_str: '1312711408698765312',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/EjewEjgXsAArZXa.jpg',
        media_url_https: 'https://pbs.twimg.com/media/EjewEjgXsAArZXa.jpg',
        url: 'https://t.co/nvXadaDV2C',
        display_url: 'pic.twitter.com/nvXadaDV2C',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711430135840774/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
        },
      },
      {
        id: 1312711421411684400,
        id_str: '1312711421411684352',
        indices: [9, 32],
        media_url: 'http://pbs.twimg.com/media/EjewFS3XcAAEXc9.jpg',
        media_url_https: 'https://pbs.twimg.com/media/EjewFS3XcAAEXc9.jpg',
        url: 'https://t.co/nvXadaDV2C',
        display_url: 'pic.twitter.com/nvXadaDV2C',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312711430135840774/photo/1',
        type: 'photo',
        sizes: {
          large: { w: 1450, h: 1158, resize: 'fit' },
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 680, h: 543, resize: 'fit' },
          medium: { w: 1200, h: 958, resize: 'fit' },
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
    statuses_count: 23,
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
};

const tweetGif = {
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
        expanded_url: 'https://twitter.com/Testacc39562769/status/1310149387922927616/photo/1',
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
        expanded_url: 'https://twitter.com/Testacc39562769/status/1310149387922927616/photo/1',
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
    statuses_count: 23,
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
};

const tweetVideo = {
  created_at: 'Sun Sep 27 09:52:31 +0000 2020',
  id: 1310155349660442600,
  id_str: '1310155349660442624',
  full_text: 'https://t.co/Qa7Stsq1P8',
  truncated: false,
  display_text_range: [0, 0],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [],
    media: [
      {
        id: 1310155286464860200,
        id_str: '1310155286464860161',
        indices: [0, 23],
        media_url:
          'http://pbs.twimg.com/ext_tw_video_thumb/1310155286464860161/pu/img/GlUNdH7FzfhY89uZ.jpg',
        media_url_https:
          'https://pbs.twimg.com/ext_tw_video_thumb/1310155286464860161/pu/img/GlUNdH7FzfhY89uZ.jpg',
        url: 'https://t.co/Qa7Stsq1P8',
        display_url: 'pic.twitter.com/Qa7Stsq1P8',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1310155349660442624/video/1',
        type: 'photo',
        sizes: {
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 383, h: 680, resize: 'fit' },
          large: { w: 720, h: 1280, resize: 'fit' },
          medium: { w: 675, h: 1200, resize: 'fit' },
        },
      },
    ],
  },
  extended_entities: {
    media: [
      {
        id: 1310155286464860200,
        id_str: '1310155286464860161',
        indices: [0, 23],
        media_url:
          'http://pbs.twimg.com/ext_tw_video_thumb/1310155286464860161/pu/img/GlUNdH7FzfhY89uZ.jpg',
        media_url_https:
          'https://pbs.twimg.com/ext_tw_video_thumb/1310155286464860161/pu/img/GlUNdH7FzfhY89uZ.jpg',
        url: 'https://t.co/Qa7Stsq1P8',
        display_url: 'pic.twitter.com/Qa7Stsq1P8',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1310155349660442624/video/1',
        type: 'video',
        sizes: {
          thumb: { w: 150, h: 150, resize: 'crop' },
          small: { w: 383, h: 680, resize: 'fit' },
          large: { w: 720, h: 1280, resize: 'fit' },
          medium: { w: 675, h: 1200, resize: 'fit' },
        },
        video_info: {
          aspect_ratio: [9, 16],
          duration_millis: 10704,
          variants: [
            {
              bitrate: 632000,
              content_type: 'video/mp4',
              url:
                'https://video.twimg.com/ext_tw_video/1310155286464860161/pu/vid/320x568/gVjvEjVwNA5kIbrT.mp4?tag=10',
            },
            {
              bitrate: 832000,
              content_type: 'video/mp4',
              url:
                'https://video.twimg.com/ext_tw_video/1310155286464860161/pu/vid/360x640/5Xaa5hda9cQ0Lr6L.mp4?tag=10',
            },
            {
              bitrate: 2176000,
              content_type: 'video/mp4',
              url:
                'https://video.twimg.com/ext_tw_video/1310155286464860161/pu/vid/720x1280/cKQwh523FPm5Ulbf.mp4?tag=10',
            },
            {
              content_type: 'application/x-mpegURL',
              url:
                'https://video.twimg.com/ext_tw_video/1310155286464860161/pu/pl/sNrZOt1ceqVCFhxi.m3u8?tag=10',
            },
          ],
        },
        additional_media_info: { monetizable: false },
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
    statuses_count: 23,
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
  lang: 'und',
  _headers: {},
};

const tweetLink = {
  created_at: 'Fri Oct 02 18:44:29 +0000 2020',
  id: 1312101164326899700,
  id_str: '1312101164326899712',
  full_text: 'some text here lol :D https://t.co/riWQEMVgVT lol ahoj',
  truncated: false,
  display_text_range: [0, 78],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [
      {
        url: 'https://t.co/riWQEMVgVT',
        expanded_url: 'http://vercel.com',
        display_url: 'vercel.com',
        indices: [46, 69],
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
    statuses_count: 23,
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
  lang: 'ht',
  _headers: {},
};

const tweet2Links = {
  created_at: 'Fri Oct 02 18:44:29 +0000 2020',
  id: 1312101164326899700,
  id_str: '1312101164326899712',
  full_text: 'some text here https://t.co/jIyoyOADgs lol :D https://t.co/riWQEMVgVT lol ahoj',
  truncated: false,
  display_text_range: [0, 78],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [
      {
        url: 'https://t.co/jIyoyOADgs',
        expanded_url: 'http://netlify.com',
        display_url: 'netlify.com',
        indices: [15, 38],
      },
      {
        url: 'https://t.co/riWQEMVgVT',
        expanded_url: 'http://vercel.com',
        display_url: 'vercel.com',
        indices: [46, 69],
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
    statuses_count: 23,
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
  lang: 'ht',
  _headers: {},
};

const tweetWithRetweet2Images = {
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
    statuses_count: 23,
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
          expanded_url: 'https://twitter.com/stanwawrinka/status/1310524147785756672/photo/1',
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
          expanded_url: 'https://twitter.com/stanwawrinka/status/1310524147785756672/photo/1',
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
          expanded_url: 'https://twitter.com/stanwawrinka/status/1310524147785756672/photo/1',
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
    source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
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
      description: 'https://t.co/iMxROTOAyV . https://t.co/9mk2NfVUAq . snapchat : stanwaw',
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
      followers_count: 1731777,
      friends_count: 588,
      listed_count: 4702,
      created_at: 'Wed Aug 12 22:40:34 +0000 2009',
      favourites_count: 181,
      utc_offset: null,
      time_zone: null,
      geo_enabled: true,
      verified: true,
      statuses_count: 9006,
      lang: null,
      contributors_enabled: false,
      is_translator: false,
      is_translation_enabled: false,
      profile_background_color: '131516',
      profile_background_image_url: 'http://abs.twimg.com/images/themes/theme14/bg.gif',
      profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme14/bg.gif',
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
    favorite_count: 7722,
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
};

const tweetWithRetweetVideo = {
  created_at: 'Sun Oct 04 11:25:10 +0000 2020',
  id: 1312715379249217500,
  id_str: '1312715379249217541',
  full_text: 'this is a cool video innit https://t.co/iGpOkffwUk',
  truncated: false,
  display_text_range: [0, 26],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [
      {
        url: 'https://t.co/iGpOkffwUk',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1310155349660442624',
        display_url: 'twitter.com/Testacc3956276…',
        indices: [27, 50],
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
    statuses_count: 24,
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
  quoted_status_id: 1310155349660442600,
  quoted_status_id_str: '1310155349660442624',
  quoted_status_permalink: {
    url: 'https://t.co/iGpOkffwUk',
    expanded: 'https://twitter.com/Testacc39562769/status/1310155349660442624',
    display: 'twitter.com/Testacc3956276…',
  },
  quoted_status: {
    created_at: 'Sun Sep 27 09:52:31 +0000 2020',
    id: 1310155349660442600,
    id_str: '1310155349660442624',
    full_text: 'https://t.co/Qa7Stsq1P8',
    truncated: false,
    display_text_range: [0, 0],
    entities: {
      hashtags: [],
      symbols: [],
      user_mentions: [],
      urls: [],
      media: [
        {
          id: 1310155286464860200,
          id_str: '1310155286464860161',
          indices: [0, 23],
          media_url:
            'http://pbs.twimg.com/ext_tw_video_thumb/1310155286464860161/pu/img/GlUNdH7FzfhY89uZ.jpg',
          media_url_https:
            'https://pbs.twimg.com/ext_tw_video_thumb/1310155286464860161/pu/img/GlUNdH7FzfhY89uZ.jpg',
          url: 'https://t.co/Qa7Stsq1P8',
          display_url: 'pic.twitter.com/Qa7Stsq1P8',
          expanded_url: 'https://twitter.com/Testacc39562769/status/1310155349660442624/video/1',
          type: 'photo',
          sizes: {
            thumb: { w: 150, h: 150, resize: 'crop' },
            small: { w: 383, h: 680, resize: 'fit' },
            large: { w: 720, h: 1280, resize: 'fit' },
            medium: { w: 675, h: 1200, resize: 'fit' },
          },
        },
      ],
    },
    extended_entities: {
      media: [
        {
          id: 1310155286464860200,
          id_str: '1310155286464860161',
          indices: [0, 23],
          media_url:
            'http://pbs.twimg.com/ext_tw_video_thumb/1310155286464860161/pu/img/GlUNdH7FzfhY89uZ.jpg',
          media_url_https:
            'https://pbs.twimg.com/ext_tw_video_thumb/1310155286464860161/pu/img/GlUNdH7FzfhY89uZ.jpg',
          url: 'https://t.co/Qa7Stsq1P8',
          display_url: 'pic.twitter.com/Qa7Stsq1P8',
          expanded_url: 'https://twitter.com/Testacc39562769/status/1310155349660442624/video/1',
          type: 'video',
          sizes: {
            thumb: { w: 150, h: 150, resize: 'crop' },
            small: { w: 383, h: 680, resize: 'fit' },
            large: { w: 720, h: 1280, resize: 'fit' },
            medium: { w: 675, h: 1200, resize: 'fit' },
          },
          video_info: {
            aspect_ratio: [9, 16],
            duration_millis: 10704,
            variants: [
              {
                bitrate: 632000,
                content_type: 'video/mp4',
                url:
                  'https://video.twimg.com/ext_tw_video/1310155286464860161/pu/vid/320x568/gVjvEjVwNA5kIbrT.mp4?tag=10',
              },
              {
                bitrate: 832000,
                content_type: 'video/mp4',
                url:
                  'https://video.twimg.com/ext_tw_video/1310155286464860161/pu/vid/360x640/5Xaa5hda9cQ0Lr6L.mp4?tag=10',
              },
              {
                bitrate: 2176000,
                content_type: 'video/mp4',
                url:
                  'https://video.twimg.com/ext_tw_video/1310155286464860161/pu/vid/720x1280/cKQwh523FPm5Ulbf.mp4?tag=10',
              },
              {
                content_type: 'application/x-mpegURL',
                url:
                  'https://video.twimg.com/ext_tw_video/1310155286464860161/pu/pl/sNrZOt1ceqVCFhxi.m3u8?tag=10',
              },
            ],
          },
          additional_media_info: { monetizable: false },
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
      statuses_count: 24,
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
    lang: 'und',
  },
  retweet_count: 0,
  favorite_count: 0,
  favorited: false,
  retweeted: false,
  possibly_sensitive: false,
  possibly_sensitive_appealable: false,
  lang: 'en',
  _headers: {},
};

const tweetWithRetweetGif = {
  created_at: 'Sun Oct 04 11:28:05 +0000 2020',
  id: 1312716114691006500,
  id_str: '1312716114691006465',
  full_text: 'a terrific joke indeed https://t.co/mJziey6o4A',
  truncated: false,
  display_text_range: [0, 22],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [
      {
        url: 'https://t.co/mJziey6o4A',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312716017525809152',
        display_url: 'twitter.com/Testacc3956276…',
        indices: [23, 46],
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
    statuses_count: 27,
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
  quoted_status_id: 1312716017525809200,
  quoted_status_id_str: '1312716017525809152',
  quoted_status_permalink: {
    url: 'https://t.co/mJziey6o4A',
    expanded: 'https://twitter.com/Testacc39562769/status/1312716017525809152',
    display: 'twitter.com/Testacc3956276…',
  },
  quoted_status: {
    created_at: 'Sun Oct 04 11:27:42 +0000 2020',
    id: 1312716017525809200,
    id_str: '1312716017525809152',
    full_text: 'is it a gif or jif https://t.co/xm5BO38f2d',
    truncated: false,
    display_text_range: [0, 18],
    entities: {
      hashtags: [],
      symbols: [],
      user_mentions: [],
      urls: [],
      media: [
        {
          id: 1312716005022617600,
          id_str: '1312716005022617600',
          indices: [19, 42],
          media_url: 'http://pbs.twimg.com/tweet_video_thumb/Eje0QGJX0AA_uYy.jpg',
          media_url_https: 'https://pbs.twimg.com/tweet_video_thumb/Eje0QGJX0AA_uYy.jpg',
          url: 'https://t.co/xm5BO38f2d',
          display_url: 'pic.twitter.com/xm5BO38f2d',
          expanded_url: 'https://twitter.com/Testacc39562769/status/1312716017525809152/photo/1',
          type: 'photo',
          sizes: {
            small: { w: 316, h: 238, resize: 'fit' },
            thumb: { w: 150, h: 150, resize: 'crop' },
            large: { w: 316, h: 238, resize: 'fit' },
            medium: { w: 316, h: 238, resize: 'fit' },
          },
        },
      ],
    },
    extended_entities: {
      media: [
        {
          id: 1312716005022617600,
          id_str: '1312716005022617600',
          indices: [19, 42],
          media_url: 'http://pbs.twimg.com/tweet_video_thumb/Eje0QGJX0AA_uYy.jpg',
          media_url_https: 'https://pbs.twimg.com/tweet_video_thumb/Eje0QGJX0AA_uYy.jpg',
          url: 'https://t.co/xm5BO38f2d',
          display_url: 'pic.twitter.com/xm5BO38f2d',
          expanded_url: 'https://twitter.com/Testacc39562769/status/1312716017525809152/photo/1',
          type: 'animated_gif',
          sizes: {
            small: { w: 316, h: 238, resize: 'fit' },
            thumb: { w: 150, h: 150, resize: 'crop' },
            large: { w: 316, h: 238, resize: 'fit' },
            medium: { w: 316, h: 238, resize: 'fit' },
          },
          video_info: {
            aspect_ratio: [158, 119],
            variants: [
              {
                bitrate: 0,
                content_type: 'video/mp4',
                url: 'https://video.twimg.com/tweet_video/Eje0QGJX0AA_uYy.mp4',
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
      statuses_count: 27,
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
    retweet_count: 1,
    favorite_count: 0,
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
  lang: 'en',
  _headers: {},
};

const tweetWithRetweetLink = {
  created_at: 'Sun Oct 04 11:33:40 +0000 2020',
  id: 1312717519694823400,
  id_str: '1312717519694823429',
  full_text: 'the platform https://t.co/jcND8EMH2O',
  truncated: false,
  display_text_range: [0, 12],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [
      {
        url: 'https://t.co/jcND8EMH2O',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312006949613993984',
        display_url: 'twitter.com/Testacc3956276…',
        indices: [13, 36],
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
    statuses_count: 29,
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
  quoted_status_id: 1312006949613994000,
  quoted_status_id_str: '1312006949613993984',
  quoted_status_permalink: {
    url: 'https://t.co/jcND8EMH2O',
    expanded: 'https://twitter.com/Testacc39562769/status/1312006949613993984',
    display: 'twitter.com/Testacc3956276…',
  },
  quoted_status: {
    created_at: 'Fri Oct 02 12:30:07 +0000 2020',
    id: 1312006949613994000,
    id_str: '1312006949613993984',
    full_text: 'Vercel https://t.co/IdcUsjRrrM',
    truncated: false,
    display_text_range: [0, 30],
    entities: {
      hashtags: [],
      symbols: [],
      user_mentions: [],
      urls: [
        {
          url: 'https://t.co/IdcUsjRrrM',
          expanded_url: 'https://vercel.com/',
          display_url: 'vercel.com',
          indices: [7, 30],
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
      statuses_count: 29,
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
    retweet_count: 1,
    favorite_count: 0,
    favorited: false,
    retweeted: false,
    possibly_sensitive: false,
    possibly_sensitive_appealable: false,
    lang: 'es',
  },
  retweet_count: 0,
  favorite_count: 0,
  favorited: false,
  retweeted: false,
  possibly_sensitive: false,
  possibly_sensitive_appealable: false,
  lang: 'en',
  _headers: {},
};

const tweetWithRetweet2Links = {
  created_at: 'Sun Oct 04 11:30:12 +0000 2020',
  id: 1312716645832495000,
  id_str: '1312716645832495105',
  full_text: 'and what about AWS??? https://t.co/tHh0892ZL8',
  truncated: false,
  display_text_range: [0, 21],
  entities: {
    hashtags: [],
    symbols: [],
    user_mentions: [],
    urls: [
      {
        url: 'https://t.co/tHh0892ZL8',
        expanded_url: 'https://twitter.com/Testacc39562769/status/1312101164326899712',
        display_url: 'twitter.com/Testacc3956276…',
        indices: [22, 45],
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
    statuses_count: 28,
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
  quoted_status_id: 1312101164326899700,
  quoted_status_id_str: '1312101164326899712',
  quoted_status_permalink: {
    url: 'https://t.co/tHh0892ZL8',
    expanded: 'https://twitter.com/Testacc39562769/status/1312101164326899712',
    display: 'twitter.com/Testacc3956276…',
  },
  quoted_status: {
    created_at: 'Fri Oct 02 18:44:29 +0000 2020',
    id: 1312101164326899700,
    id_str: '1312101164326899712',
    full_text: 'some text here https://t.co/jIyoyOADgs lol :D https://t.co/riWQEMVgVT lol ahoj',
    truncated: false,
    display_text_range: [0, 78],
    entities: {
      hashtags: [],
      symbols: [],
      user_mentions: [],
      urls: [
        {
          url: 'https://t.co/jIyoyOADgs',
          expanded_url: 'http://netlify.com',
          display_url: 'netlify.com',
          indices: [15, 38],
        },
        {
          url: 'https://t.co/riWQEMVgVT',
          expanded_url: 'http://vercel.com',
          display_url: 'vercel.com',
          indices: [46, 69],
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
      statuses_count: 28,
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
    lang: 'ht',
  },
  retweet_count: 0,
  favorite_count: 0,
  favorited: false,
  retweeted: false,
  possibly_sensitive: false,
  possibly_sensitive_appealable: false,
  lang: 'en',
  _headers: {},
};

const Components = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [radioValue, setRadioValue] = useState('vue');
  const [inputValue, setInputValue] = useState('');

  return (
    <Box>
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
      <Stack px="200px" mt="200px" spacing={16}>
        <Box>
          <Heading size="md" mb={4}>
            Tweet - text
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweet} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Tweet - 1 image
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweet1Image} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Tweet - 2 images
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweet2Images} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Tweet - 3 images
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweet3Images} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Tweet - 4 images
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweet4Images} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Tweet - gif
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweetGif} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Tweet - video
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweetVideo} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Tweet - 2 links
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={
              <TweetBoxContent
                tweet={{
                  ...tweet2Links,
                  linkDescription:
                    'Deploy web projects with the best frontend developer experience and highest end-user performance.',
                  linkTitle: 'Develop. Preview. Ship. For the best frontend teams – Vercel',
                  linkImageUrl:
                    'https://pbs.twimg.com/card_img/1312709115328724992/FhiX48dA?format=png&name=small',
                }}
              />
            }
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Tweet - link
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={
              <TweetBoxContent
                tweet={{
                  ...tweetLink,
                  linkDescription:
                    'Deploy web projects with the best frontend developer experience and highest end-user performance.',
                  linkTitle: 'Develop. Preview. Ship. For the best frontend teams – Vercel',
                  linkImageUrl:
                    'https://pbs.twimg.com/card_img/1312709115328724992/FhiX48dA?format=png&name=small',
                }}
              />
            }
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Retweet - text
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweetWithTextRetweet} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Retweet - 2 images
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweetWithRetweet2Images} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Retweet - video
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweetWithRetweetVideo} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Retweet - gif
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweetWithRetweetGif} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Retweet - link
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={
              <TweetBoxContent
                tweet={{
                  ...tweetWithRetweetLink,
                  linkDescription:
                    'Deploy web projects with the best frontend developer experience and highest end-user performance.',
                  linkTitle: 'Develop. Preview. Ship. For the best frontend teams – Vercel',
                  linkImageUrl:
                    'https://pbs.twimg.com/card_img/1312709115328724992/FhiX48dA?format=png&name=small',
                }}
              />
            }
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Retweet - 2 links
          </Heading>
          <TweetBox
            href="https://twitter.com/screenName/status/8534205234"
            header={
              <TweetBoxHeader
                created_at="Sun Sep 27 09:52:31 +0000 2020"
                imageUrl="http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                name="Tom Dohnal"
                screenName="screenname"
              />
            }
            content={<TweetBoxContent tweet={tweetWithRetweet2Links} />}
            actions={<TweetBoxActions favorite_count={5} retweet_count={5} tweetId="545324" />}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Components;
