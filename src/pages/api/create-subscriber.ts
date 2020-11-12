import { NextApiRequest, NextApiResponse } from 'next';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { get as getTweets } from '../../controllers/tweets';
import logger from '../../logger';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us2',
});

const fetch = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await mailchimp.lists.addListMember('716aeae2ec', {
      email_address: req.query.email,
      status: 'pending',
    });

    res.status(204).end();
  } catch (err) {
    logger.error(err);
    res.status(500).end();
  }
};

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

export type Response = Await<ReturnType<typeof getTweets>>;

export default fetch;
