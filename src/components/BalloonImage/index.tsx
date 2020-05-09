import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSprings, useSpring, config } from 'react-spring';
import * as R from 'ramda';
import { Box } from '@chakra-ui/core';
import Defs from './Defs';
import LargeBalloon from './LargeBalloon';
import SmallBalloons from './SmallBalloons';

const BalloonImage: React.FC = () => {
  const [svgRef, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const largeBalloonAnimationStyle = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView
      ? 'translate3d(0px, 0px, 0px) scale(1)'
      : 'translate3d(0px, 100px, 0px) scale(0.9)',
    config: config.molasses,
  });

  const smallBalloonsAnimationStyles = useSprings(
    11,
    R.range(0, 11).map((i) => ({
      opacity: inView ? 1 : 0,
      transform: inView ? 1 : 0,
      config: { mass: 1, tension: 200, friction: 400 },
      delay: 500 + ((i + 5) % 11) * 50,
    })),
  ).map((style: any) => ({
    ...style,
    transform: style.transform.to(
      [0, 0.25, 0.5, 0.62, 0.75, 1],
      [
        'translate3d(0px, 400px, 0px) scale(0.7)',
        'translate3d(0px, 200px, 0px) scale(1)',
        'translate3d(0px, 100px, 0px) scale(1)',
        'translate3d(0px, 50px, 0px) scale(1)',
        'translate3d(0px, 0px, 0px) scale(1)',
        'translate3d(0px, -400px, 0px) scale(0.7)',
      ],
    ),
    opacity: style.opacity.to([0, 0.25, 0.75, 1], [0, 1, 1, 0]),
  }));

  return (
    <Box ref={svgRef}>
      <Box
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-407 -300 852 728"
        fill="none"
        transform="translate(-59%, -28%) scale(2)"
      >
        <SmallBalloons animationStyles={smallBalloonsAnimationStyles} />
        <LargeBalloon animationStyle={largeBalloonAnimationStyle} />
        <Defs />
      </Box>
    </Box>
  );
};

export default BalloonImage;
