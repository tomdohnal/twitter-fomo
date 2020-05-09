import createMetascraper from 'metascraper';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';
import fetch from 'cross-fetch';
import logger from './logger';

const metascraper = createMetascraper([
  metascraperDescription(),
  metascraperImage(),
  metascraperTitle(),
]);

export async function scrapeMetadata(
  url: string,
): Promise<{
  title?: string;
  description?: string;
  imageUrl?: string;
}> {
  try {
    const html = await fetch(url).then((res) => res.text());

    const metadata = await metascraper({ html, url });

    return metadata;
  } catch (err) {
    logger.error(err);

    return {};
  }
}
