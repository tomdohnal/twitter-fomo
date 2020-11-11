import React, { cloneElement, useRef } from 'react';
import { animated } from 'react-spring';
import { getSvgTransformStyle, getTransformOrigin } from '../../svg-utils';

const LOGO_ITEMS = [
  {
    path: <path d="M 378 0.5 C 336.4 2.8 283.3 12.7 238.7 47.3 C 192.1 83.3 181 114.2 181 134" />,
    item: (
      <animated.g>
        <g fill="#fff">
          <mask id="path-62-inside-1">
            <path d="M191.7 116.1h-21c-2.4 0-4.4 2-4.4 4.5v21c0 2.4 2 4.4 4.4 4.4h21c2.5 0 4.5-2 4.5-4.4v-21c0-2.5-2-4.5-4.5-4.5z" />
          </mask>
          <path
            stroke="#000"
            strokeWidth="2"
            d="M191.7 116.1h-21c-2.4 0-4.4 2-4.4 4.5v21c0 2.4 2 4.4 4.4 4.4h21c2.5 0 4.5-2 4.5-4.4v-21c0-2.5-2-4.5-4.5-4.5z"
            mask="url(#path-62-inside-1)"
          />
        </g>
        <g>
          <path fill="#F7DF1E" d="M191 122h-20v20h20v-20z" />
          <path
            fill="#000"
            d="M184.4 137.6c.4.7 1 1.2 1.9 1.2.8 0 1.3-.4 1.3-1s-.5-.8-1.4-1.2l-.5-.2c-1.3-.6-2.2-1.3-2.2-2.8 0-1.5 1-2.5 2.7-2.5 1.2 0 2 .4 2.7 1.5l-1.5 1c-.3-.7-.6-.9-1.2-.9-.5 0-.9.4-.9.8 0 .6.4.8 1.2 1.2l.4.2c1.6.6 2.5 1.3 2.5 3 0 1.6-1.3 2.5-3 2.5-1.8 0-3-.8-3.5-1.9l1.5-.9zm-6.6.2c.3.5.6 1 1.2 1s1-.3 1-1.2v-6.4h1.9v6.4c0 2-1.1 2.8-2.8 2.8a3 3 0 01-2.8-1.7l1.5-1z"
          />
        </g>
      </animated.g>
    ),
    baseRotation: -101,
  },
  {
    path: <path d="M 378 0 C 331.6 1.3 317 3.3 267.3 23.5 C 215.4 44.5 203 62.4 203 74" />,
    item: (
      <animated.g>
        <g fill="#fff">
          <mask id="path-75-inside-2">
            <path d="M186.8 91h21c2.4 0 4.4-2 4.4-4.5v-21c0-2.5-2-4.5-4.5-4.5h-21c-2.4 0-4.4 2-4.4 4.5v21c0 2.4 2 4.4 4.5 4.4z" />
          </mask>
          <path
            stroke="#41B883"
            strokeWidth="2"
            d="M186.8 91h21c2.4 0 4.4-2 4.4-4.5v-21c0-2.5-2-4.5-4.5-4.5h-21c-2.4 0-4.4 2-4.4 4.5v21c0 2.4 2 4.4 4.5 4.4z"
            mask="url(#path-75-inside-2)"
          />
        </g>
        <g>
          <path fill="#41B883" d="M203 70h4l-10 17.3L187 70h7.7l2.3 4 2.3-4h3.7z" />
          <path fill="#41B883" d="M187 70l10 17.3L207 70h-4l-6 10.3-6-10.3h-4z" />
          <path fill="#35495E" d="M191 70l6 10.4 6-10.4h-3.7l-2.3 4-2.3-4h-3.8z" />
        </g>
      </animated.g>
    ),
    baseRotation: -117,
  },
  {
    path: <path d="M 376 1 C 345 1.7 305.3 4.7 272 15.4 C 237.3 26.4 229 36 229 42" />,
    item: (
      <animated.g>
        <g fill="#fff">
          <mask id="path-79-inside-3">
            <path d="M218.5 53.9h21c2.5 0 4.5-2 4.5-4.5v-21c0-2.4-2-4.4-4.5-4.4h-21c-2.5 0-4.5 2-4.5 4.5v21c0 2.4 2 4.4 4.5 4.4z" />
          </mask>
          <path
            stroke="#000"
            strokeWidth="2"
            d="M218.5 53.9h21c2.5 0 4.5-2 4.5-4.5v-21c0-2.4-2-4.4-4.5-4.4h-21c-2.5 0-4.5 2-4.5 4.5v21c0 2.4 2 4.4 4.5 4.4z"
            mask="url(#path-79-inside-3)"
          />
        </g>
        <g>
          <path
            fill="#000"
            d="M238.9 38.8l-.9-.6V38l.7-.7.1-.3-.2-.2-.9-.3v-.2l.5-.8a.3.3 0 00-.2-.5l-1-.2v-.2l.3-.9a.3.3 0 00-.2-.4h-1l-.2-.1.2-1a.3.3 0 00-.3-.3l-1 .2-.2-.2v-1.2h-.3l-1 .4-.1-.1-.2-1a.3.3 0 00-.5-.2l-.8.6-.2-.1-.3-1a.3.3 0 00-.5 0l-.7.7h-.2l-.6-.9a.3.3 0 00-.4 0l-.6.9h-.2l-.7-.7a.3.3 0 00-.5 0l-.3 1h-.2l-.8-.5a.3.3 0 00-.5.2l-.2 1h-.2l-.9-.3h-.3v1.2l-.2.2-1-.2a.3.3 0 00-.3.3l.2 1-.2.2h-1.2v.3l.4 1-.1.1-1 .2c-.1 0-.2 0-.2.2v.3l.6.8-.1.2-1 .3-.1.2v.3l.8.7v.2l-.9.6a.3.3 0 000 .4l.9.6v.2l-.7.7a.3.3 0 000 .5l1 .3v.2l-.5.8a.3.3 0 00.2.5l1 .2v.2l-.3.9a.3.3 0 00.2.4h1l.2.1-.2 1a.3.3 0 00.3.3l1-.2.2.2v1.2h.3l1-.4.1.1.2 1a.3.3 0 00.5.2l.8-.6.2.1.3 1a.3.3 0 00.5 0l.7-.7h.2l.6.9a.3.3 0 00.4 0l.6-.9h.2l.7.7a.3.3 0 00.5 0l.3-1h.2l.8.5a.3.3 0 00.5-.2l.2-1h.2l.9.3a.3.3 0 00.4-.2v-1l.1-.2 1 .2h.3v-.3l-.2-1 .2-.2h1a.3.3 0 00.2-.3l-.4-1 .1-.1 1-.2a.3.3 0 00.2-.5l-.6-.8.1-.2 1-.3.1-.2v-.3l-.8-.7v-.2l.9-.6a.3.3 0 000-.4zm-5.7 7a.6.6 0 11.3-1.2.6.6 0 01-.3 1.1zm-.2-2c-.3 0-.6.1-.7.4l-.3 1.4a7.3 7.3 0 01-6 0l-.4-1.4c0-.3-.3-.5-.6-.4l-1.2.2-.7-.7h6l.1-.1v-2.1h-1.9v-1.4h2c.1 0 .9 0 1.1 1l.3 1.5c.2.4.6 1 1.1 1h3l-.6.9-1.2-.3zm-8.3 1.9a.6.6 0 11-.3-1.2.6.6 0 01.3 1.2zm-2.3-9.2a.6.6 0 11-1 .5.6.6 0 011-.5zm-.7 1.7l1.3-.6c.3-.1.4-.5.3-.7l-.3-.6h1v4.6h-2a7.3 7.3 0 01-.3-2.7zm5.6-.5v-1.4h2.5c.1 0 1 .2 1 .7 0 .5-.7.7-1.2.7h-2.3zm9 1.2v.6h-.8v.4c0 .9-.5 1-1 1-.3.1-.7 0-.8-.3-.2-1.3-.6-1.6-1.2-2 .8-.5 1.5-1.2 1.5-2.1 0-1-.7-1.6-1.1-2-.7-.4-1.4-.4-1.6-.4h-7.7c1-1.2 2.4-2 4-2.4l1 1c.2.2.5.2.7 0l1-1c2.2.4 4 1.8 5 3.6l-.6 1.6c-.2.3 0 .6.2.7l1.4.6v.7zm-7.7-8c.2-.2.6-.2.8 0a.6.6 0 11-.8 0zm7 5.6a.6.6 0 111 .5.6.6 0 11-1-.5z"
          />
        </g>
      </animated.g>
    ),
    baseRotation: -131,
  },
  {
    path: <path d="M 399 0 C 374.3 0.4 342.7 2.2 316.3 8.4 C 288.6 14.9 282 20.4 282 24" />,
    item: (
      <animated.g>
        <g fill="#fff">
          <mask id="path-81-inside-4">
            <path d="M268.4 38.8h21c2.5 0 4.5-2 4.5-4.5v-21c0-2.4-2-4.4-4.5-4.4h-21c-2.5 0-4.5 2-4.5 4.4v21c0 2.5 2 4.5 4.5 4.5z" />
          </mask>
          <path
            stroke="#1C78C0"
            strokeWidth="2"
            d="M268.4 38.8h21c2.5 0 4.5-2 4.5-4.5v-21c0-2.4-2-4.4-4.5-4.4h-21c-2.5 0-4.5 2-4.5 4.4v21c0 2.5 2 4.5 4.5 4.5z"
            mask="url(#path-81-inside-4)"
          />
        </g>
        <g>
          <path fill="#fff" d="M278.8 14l8.9 5v10l-8.9 5-8.8-5V19l8.8-5z" />
          <path
            fill="#8ED6FB"
            d="M286.1 28.7l-7 3.9v-3l4.4-2.5 2.6 1.6zm.5-.5V20l-2.6 1.5v5.3l2.6 1.4zm-15 .5l7 3.9v-3l-4.4-2.5-2.6 1.6zm-.5-.5V20l2.5 1.5v5.3l-2.5 1.4zm.3-8.8l7.1-4v3l-4.6 2.5-2.5-1.5zm14.9 0l-7.2-4v3l4.6 2.5 2.6-1.5z"
          />
          <path
            fill="#1C78C0"
            d="M278.5 28.8l-4.3-2.3v-4.7l4.3 2.5v4.5zm.6 0l4.3-2.3v-4.7l-4.3 2.5v4.5zm-4.6-7.5l4.3-2.4 4.3 2.4-4.3 2.4-4.3-2.4z"
          />
        </g>
      </animated.g>
    ),
    baseRotation: -143,
  },
];

const Logos: React.FC<{
  animatedValues: any[];
}> = ({ animatedValues }) => {
  const pathRefs = useRef<SVGPathElement[]>([]);
  const itemRefs = useRef<(SVGPathElement | SVGGElement)[]>([]);

  return (
    <>
      {LOGO_ITEMS.map(({ path, item, baseRotation = 0 }, index) => (
        <g key={index}>
          {cloneElement(path, {
            ref(ref: SVGPathElement) {
              if (ref) {
                pathRefs.current[index] = ref;
              }
            },
          })}
          {cloneElement(item, {
            ref(ref: SVGPathElement) {
              if (ref) {
                itemRefs.current[index] = ref;
              }
            },
            style: {
              opacity: animatedValues[index].opacity,
              transform: getSvgTransformStyle({
                x: animatedValues[index].x,
                path: pathRefs.current[index],
                element: itemRefs.current[index],
                baseRotation,
              }),
              transformOrigin: getTransformOrigin(itemRefs.current[index]),
            },
          })}
        </g>
      ))}
    </>
  );
};

export default Logos;
