import { Filters } from '../../filters';

export const PERIOD_ITEMS = [
  {
    label: 'Day',
    value: 'DAY',
  },
  {
    label: 'Week',
    value: 'WEEK',
  },
];

export const COMMUNITY_ITEMS = ['React', 'Vue', 'Angular'];

export const TWEET_TYPE_ITEMS = [
  {
    label: 'Text',
    value: 'TEXT',
  },
  {
    label: 'Media',
    value: 'MEDIA',
  },
  {
    label: 'Link',
    value: 'LINK',
  },
];

export const ACCOUNT_TYPE_ITEMS = [
  {
    label: 'Personal',
    value: 'PERSONAL',
  },
  {
    label: 'Page',
    value: 'BUSINESS',
  },
];

interface FilterAction {
  value: Filters[keyof Filters];
  name: keyof Filters;
}

export const createGetNewFilters = (filters: Filters) => (action: FilterAction): Filters => {
  const oldField = filters[action.name];
  const newField = Array.isArray(oldField)
    ? oldField.includes(action.value as string)
      ? oldField.filter((value) => value !== action.value)
      : [...oldField, action.value]
    : action.value;

  return { ...filters, [action.name]: newField };
};

export const INITIAL_FILTERS: Filters = {
  period: 'DAY',
  accountTypes: [],
  communities: [],
  tweetTypes: [],
};

export interface Props {
  filters: Filters;
  setFilters(filters: Filters): void;
  setFilters(fn: (filters: Filters) => Filters): void;
}
