import * as Sentry from '@sentry/node';

const logger = {
  log(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.log(...args);
  },
  error(err: Error) {
    Sentry.captureException(err);

    // eslint-disable-next-line no-console
    console.error(err);
  },
};

export default logger;
