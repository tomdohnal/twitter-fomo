import React, { useRef } from 'react';
import { animated } from 'react-spring';
import { getTransformOrigin } from '../../svg-utils';

const Clouds: React.FC<{
  animatedValues: any[];
}> = ({ animatedValues }) => {
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const cloud3Ref = useRef(null);

  return (
    <g>
      <animated.path
        ref={cloud1Ref}
        style={{
          transformOrigin: getTransformOrigin(cloud1Ref.current),
          ...animatedValues[0],
        }}
        fill="#F2F2F2"
        d="M262.445 167.664c-20.108.093-36.475.39-36.475.39s19.455-25.803 36.402-16.243c16.947 9.56 36.415 15.907 36.415 15.907s-16.234-.147-36.342-.054z"
      />
      <animated.path
        ref={cloud2Ref}
        style={{
          transformOrigin: getTransformOrigin(cloud2Ref.current),
          ...animatedValues[1],
        }}
        fill="#F2F2F2"
        d="M96.895 205.515c-20.108.093-36.475.391-36.475.391s19.455-25.803 36.402-16.243c16.947 9.559 36.415 15.907 36.415 15.907s-16.234-.147-36.342-.055z"
      />
      <animated.path
        ref={cloud3Ref}
        style={{
          transformOrigin: getTransformOrigin(cloud3Ref.current),
          ...animatedValues[2],
        }}
        fill="#F2F2F2"
        d="M349.348 231.185c-20.108.092-36.475.39-36.475.39s19.455-25.803 36.402-16.243c16.947 9.56 36.415 15.907 36.415 15.907s-16.234-.147-36.342-.054z"
      />
    </g>
  );
};

export default Clouds;
