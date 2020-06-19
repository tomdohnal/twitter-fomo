const logger = {
  log(...args: unknown[]) {
    console.log(...args);
  },
  error(err: Error) {
    // TODO: add Sentry or similar
    console.error(err);
  },
};

export default logger;
