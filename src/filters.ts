import { AccountType } from '@prisma/client';
import logger from '../backend/logger';

export interface Filters {
  period: string;
  communities: string[];
  tweetTypes: string[];
  accountTypes: AccountType[];
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

    return {} as Filters;
  }
};

export const encode = (object: Record<string, unknown>) => {
  const string = JSON.stringify(object);

  if (typeof window === 'undefined') {
    return Buffer.from(string).toString('base64');
  }

  return window.btoa(string);
};
