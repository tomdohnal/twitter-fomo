import fetch from 'cross-fetch';

const fetcher = (url: string) => {
  return fetch(`/api/${url}`).then((res) => res.json());
};

export default fetcher;
