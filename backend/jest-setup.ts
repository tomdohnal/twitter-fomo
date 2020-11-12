import { faker } from './testUtils';

beforeEach(() => {
  // this makes generated fake data consistent across multiple test runs
  faker.seed(1);
});
