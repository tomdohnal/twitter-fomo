import { AccountType } from '@prisma/client';

export interface Filters {
  period: string;
  communities: string[];
  tweetTypes: string[];
  accountTypes: AccountType[];
}

export const decode = (encodedString: string): Filters => {
  let decodedString;

  if (typeof window === 'undefined') {
    decodedString = Buffer.from(encodedString, 'base64').toString('binary');
  } else {
    decodedString = window.atob(encodedString);
  }

  return JSON.parse(decodedString);
};

export const encode = (object: Record<string, unknown>) => {
  const string = JSON.stringify(object);

  if (typeof window === 'undefined') {
    return Buffer.from(string).toString('base64');
  }

  return window.btoa(string);
};
