const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-title')(),
]);
const fetch = require('cross-fetch');

async function run() {
  const html = await fetch('https://vercel.com').then(res => res.text());

  const metadata = await metascraper({ html, url: 'https://vercel.com' });
  console.log('-------------------------------------------------');
  console.log(metadata);
  console.log('-------------------------------------------------');
}

run();
