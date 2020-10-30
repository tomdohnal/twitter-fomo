import * as Sentry from '@sentry/node';

const logger = {
  error(err: Error) {
    Sentry.captureException(err);

    // eslint-disable-next-line no-console
    console.error(err);
  },
};

export default logger;
