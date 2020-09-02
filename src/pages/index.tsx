import React from 'react';
import Link from 'next/link';

const Index: React.FC = () => (
  <div>
    Twitter FOMO
    <br />
    <Link href="/leaderboard">
      <a>Leaderboard</a>
    </Link>
  </div>
);

export default Index;
