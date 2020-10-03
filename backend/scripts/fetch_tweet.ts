import { getApp } from '../twitter';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config();

async function run() {
  try {
    const twitterApp = await getApp();

    const id = process.argv[2];

    const res = await twitterApp.get(`statuses/show/${id}`, {
      include_rts: false,
      exclude_replies: true,
      tweet_mode: 'extended',
    });

    fs.writeFileSync(path.join(__dirname, '../../tweet.json'), JSON.stringify(res));
  } catch (err) {
    console.error(err);
  }
}

run();
