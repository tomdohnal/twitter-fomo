import React, { useRef } from 'react';
import { animated } from 'react-spring';
import { getTransformOrigin } from '../../svg-utils';

const Flowers: React.FC<{
  animatedValues: any[];
}> = ({ animatedValues }) => {
  const refs = useRef<SVGGElement[]>([]);

  return (
    <>
      <animated.g
        ref={(ref: SVGGElement | null) => {
          if (ref) {
            refs.current[0] = ref;
          }
        }}
        style={{
          ...animatedValues[0],
          transformOrigin: getTransformOrigin(refs.current[0]),
        }}
      >
        <path
          stroke="#535461"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M89.5 203.6s-13-7.1-17-18.2a22.6 22.6 0 00-8.7-11.3 38 38 0 00-6.1-3.3"
        />
        <path
          fill="#A30664"
          d="M55.2 163.8c1.2 1.3 2.6 7.1 2.6 7.1s-5.9-1.3-7.1-2.6a3.2 3.2 0 014.5-4.5z"
        />
        <path
          fill="#A30664"
          d="M65.8 167c.4 1.7-1.7 7.4-1.7 7.4s-4.2-4.3-4.5-6a3.2 3.2 0 116.2-1.4z"
        />
        <path
          fill="#A30664"
          d="M77.4 179c-.6 1.6-5.2 5.5-5.2 5.5s-1.4-5.9-.9-7.5a3.2 3.2 0 016 2z"
        />
        <path
          fill="#A30664"
          d="M84 190c-.2 1.7-4.1 6.3-4.1 6.3s-2.4-5.5-2.1-7.3a3.2 3.2 0 016.3 1z"
        />
        <path
          fill="#A30664"
          d="M59.6 179.3c1.8 0 6.8-3.2 6.8-3.2s-5.1-3.1-6.9-3.1a3.2 3.2 0 000 6.3h.1z"
        />
        <path
          fill="#A30664"
          d="M67.6 192.1c1.7-.5 5.5-5.1 5.5-5.1s-5.8-1.5-7.5-1a3.2 3.2 0 002 6.1z"
        />
        <path
          fill="#A30664"
          d="M77.1 203.5c1.8-.3 6.3-4.2 6.3-4.2s-5.5-2.4-7.2-2.1a3.2 3.2 0 00-2.7 3.6 3.2 3.2 0 003.6 2.7z"
        />
      </animated.g>
      <animated.g
        ref={(ref: SVGGElement | null) => {
          if (ref) {
            refs.current[1] = ref;
          }
        }}
        style={{
          ...animatedValues[1],
          transformOrigin: getTransformOrigin(refs.current[1]),
        }}
      >
        <path
          stroke="#535461"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M99.8 172.7s-9-11.8-8.1-23.5c.4-4.9-.8-9.7-3.4-13.9a38 38 0 00-4.3-5.5"
        />
        <path
          fill="#A30664"
          d="M84.6 122.5c.6 1.6-.6 7.5-.6 7.5s-4.7-3.6-5.4-5.3a3.2 3.2 0 116-2.2z"
        />
        <path
          fill="#A30664"
          d="M93 129.7c-.4 1.7-4.6 6-4.6 6s-2-5.6-1.7-7.3a3.2 3.2 0 015-2 3.2 3.2 0 011.3 3.3z"
        />
        <path
          fill="#A30664"
          d="M98.7 145.3c-1.2 1.3-7 2.9-7 2.9s1.1-5.9 2.3-7.2a3.2 3.2 0 114.7 4.3z"
        />
        <path fill="#A30664" d="M100.4 158c-1 1.5-6.4 4.1-6.4 4.1s0-6 1-7.5a3.2 3.2 0 015.4 3.5z" />
        <path
          fill="#A30664"
          d="M82.3 138.4c1.6.7 7.6-.2 7.6-.2s-3.5-5-5-5.6a3.2 3.2 0 00-2.6 5.8z"
        />
        <path
          fill="#A30664"
          d="M84.5 153.3c1.7.2 7.1-2.4 7.1-2.4s-4.8-3.7-6.5-3.9a3.2 3.2 0 00-.6 6.3z"
        />
        <path
          fill="#A30664"
          d="M88.5 167.6c1.7.4 7.5-1.3 7.5-1.3s-4-4.4-5.8-4.9a3.2 3.2 0 10-1.7 6.2z"
        />
      </animated.g>
      <animated.g
        ref={(ref: SVGGElement | null) => {
          if (ref) {
            refs.current[2] = ref;
          }
        }}
        style={{
          ...animatedValues[2],
          transformOrigin: getTransformOrigin(refs.current[2]),
        }}
      >
        <path
          stroke="#535461"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M267.2 188.3s-1.9-14.8 4.8-24.4c2.8-4 4.3-8.8 4.1-13.7a38 38 0 00-.9-7"
        />
        <path
          fill="#A30664"
          d="M279.4 137.2c-.3 1.7-4.3 6.2-4.3 6.2s-2.3-5.5-2-7.3a3.2 3.2 0 016.3 1z"
        />
        <path fill="#A30664" d="M283 147.6c-1.2 1.3-7 3-7 3s1-6 2.3-7.2a3.2 3.2 0 014.7 4.2z" />
        <path fill="#A30664" d="M280 164c-1.6.5-7.4-1-7.4-1s3.9-4.5 5.5-5a3.2 3.2 0 012 6z" />
        <path
          fill="#A30664"
          d="M275 175.9c-1.5.8-7.5.3-7.5.3s3-5.2 4.6-6a3.2 3.2 0 013.5.4 3.2 3.2 0 01-.6 5.3z"
        />
        <path
          fill="#A30664"
          d="M269.4 149.8c1 1.4 6.6 3.6 6.6 3.6s-.5-6-1.5-7.4a3.2 3.2 0 00-5.1 3.8z"
        />
        <path
          fill="#A30664"
          d="M263.7 163.8c1.4 1 7.4 1.5 7.4 1.5s-2.2-5.6-3.7-6.7a3.2 3.2 0 00-3.7 5.2z"
        />
        <path
          fill="#A30664"
          d="M260 178.1c1.3 1.3 7 2.7 7 2.7s-1.2-5.8-2.4-7.1a3.2 3.2 0 00-3.5-.8 3.2 3.2 0 00-1 5.2z"
        />
      </animated.g>
    </>
  );
};

export default Flowers;
