import React from 'react';
import * as R from 'ramda';
import { useSprings, config, useSpring } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Box } from '@chakra-ui/core';
import Defs from './Defs';
import FrontMountains from './FrontMountains';
import Girl from './Girl';
import Clouds from './Clouds';
import TwitterLogo from './TwitterLogo';
import Chair from './Chair';
import BackMountains from './BackMountains';
import Leaves from './Leaves';

const Index: React.FC = () => {
  const [svgRef, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const cloudsAnimatedValues = useSprings(
    3,
    R.range(0, 3).map((i) => ({
      opacity: inView ? 1 : 0,
      transform: inView
        ? 'translate3d(0px, 0, 0) scale(1)'
        : 'translate3d(-150px, 0, 0) scale(0.9)',
      delay: i * 50,
      config: config.molasses,
    })),
  );
  const chairAnimatedValues = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView
      ? 'translate3d(0px, 0px, 0) scale(1)'
      : 'translate3d(0px, -100px, 0) scale(0.8)',
    config: config.molasses,
    delay: 500,
  });
  const girlAnimatedValues = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView
      ? 'translate3d(0px, 0px, 0) scale(1)'
      : 'translate3d(0px, -100px, 0) scale(0.8)',
    config: config.slow,
    delay: 1200,
  });
  const birdAnimatedValues = useSpring({
    transform: inView ? 'scale(1)' : 'scale(0)',
    config: config.wobbly,
    delay: 1800,
  });
  const leavesAnimatedValues = useSprings(
    6,
    R.range(0, 6).map((i) => ({
      x: inView ? 1 : 0,
      opacity: inView ? 1 : 0,
      config: config.molasses,
      delay: 2500 + i * 100,
    })),
  );

  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      transform="translateX(-10%)"
      fill="none"
      viewBox="-300 0 792 344"
      ref={svgRef}
    >
      <g>
        <BackMountains />
        <TwitterLogo animatedValues={birdAnimatedValues} />
        <Clouds animatedValues={cloudsAnimatedValues} />
        <Chair animatedValues={chairAnimatedValues} />
        <Girl animatedValues={girlAnimatedValues} />
        <Leaves animatedValues={leavesAnimatedValues} />
        <FrontMountains />
      </g>
      <Defs />
    </Box>
  );
};

export default Index;
