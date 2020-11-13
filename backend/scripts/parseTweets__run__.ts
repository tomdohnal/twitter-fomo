import { run } from './parseTweets';
import logger from '../logger';

run().catch((err) => {
  logger.error(err);
});
