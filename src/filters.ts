import { DEFAULT_FILTER } from './constants';
import logger from '../backend/logger';

export interface Filters {
  period: string;
  communities: string[];
  tweetTypes: string[];
  accountTypes: string[];
}

export const decode = (encodedString: string): Filters => {
  let decodedString;

  try {
    if (typeof window === 'undefined') {
      decodedString = Buffer.from(encodedString, 'base64').toString('binary');
    } else {
      decodedString = window.atob(encodedString);
    }

    const filters = JSON.parse(decodedString);

    return filters;
  } catch (err) {
    logger.error(err);

    if (typeof window === 'undefined') {
      return JSON.parse(Buffer.from(DEFAULT_FILTER, 'base64').toString('binary'));
    }

    return JSON.parse(window.atob(DEFAULT_FILTER));
  }
};

export const encode = (object: Filters) => {
  const string = JSON.stringify(object);

  if (typeof window === 'undefined') {
    return Buffer.from(string).toString('base64');
  }

  return window.btoa(string);
};
