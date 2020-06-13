const logger = {
  log(message: unknown) {
    console.log(message);
  },
  error(err: Error) {
    // TODO: add Sentry or similar
    console.error(err);
  },
};

export default logger;
