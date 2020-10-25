const logger = {
  error(err: Error) {
    // TODO: add Sentry or similar
    // eslint-disable-next-line no-console
    console.error(err);
  },
};

export default logger;
