import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const dayjsUtc = dayjs.utc;

export const DAY_NOW = dayjsUtc().startOf('day');
export const DAY_BEFORE_ONE_WEEK = DAY_NOW.subtract(1, 'week');

export { Dayjs };
