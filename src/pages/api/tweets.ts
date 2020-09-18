import { NextApiRequest, NextApiResponse } from 'next';
import { get as getTweets } from '../../controllers/tweets';

const fetch = async (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  const tweets = await getTweets(req.query.filters);

  console.log({ tweets });

  res.status(200).json(tweets);
};

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

export type Response = Await<ReturnType<typeof getTweets>>;

export default fetch;
