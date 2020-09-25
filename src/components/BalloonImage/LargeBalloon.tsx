import React, { useRef } from 'react';
import { SpringValues, animated } from 'react-spring';
import { getTransformOrigin } from '../../svg-utils';

const LargeBalloon: React.FC<{
  animationStyle: SpringValues<{ opacity: number; transform: string }>;
}> = ({ animationStyle }) => {
  const ref = useRef(null);

  return (
    <animated.g
      ref={ref}
      style={{ ...animationStyle, transformOrigin: getTransformOrigin(ref.current) }}
    >
      <path
        fill="url(#paint14_linear)"
        d="M383.3 114.3c0 59.7-49.8 108-103 108-53 0-107.4-48.3-107.4-108C173 54.5 227.3 6 280.4 6c53 0 102.9 48.4 102.9 108.2z"
      />
      <path
        fill="#FFB8D2"
        d="M378.4 114.3c0 56.9-47.5 103-98.1 103-50.6 0-102.4-46.1-102.4-103 0-57 51.8-103.1 102.4-103.1 50.6 0 98 46.1 98 103z"
      />
      <path
        fill="url(#paint15_linear)"
        d="M265.3 255.6c0-3.6-3.2-6.5-7.2-6.5s-7.2 3-7.2 6.5c0 3 2.3 5.6 5.4 6.3v5h3.6v-5c3.1-.7 5.4-3.3 5.4-6.3z"
      />
      <path
        fill="url(#paint16_linear)"
        d="M239.3 256.4l-7.3-7.3-.2.1c-.7-1.6-2-2.6-2.8-2.2-.8.3-.9 2-.1 3.6l.6 1-.8.7s18.7 18.8 26 18l1.4-5.2s-6.2.3-16.8-8.7z"
      />
      <path fill="#F8C198" d="M258 261.8a6 6 0 100-12 6 6 0 000 12z" />
      <path fill="#F8C198" d="M259.4 260.3h-3v6h3v-6z" />
      <path
        fill="#605B38"
        d="M260.9 264.1h-6a3 3 0 00-3 3v21a3 3 0 003 3.1h6a3 3 0 003-3v-21a3 3 0 00-3-3.1z"
      />
      <path fill="#605B38" d="M255.4 264.6s-5.8.3-15.5-8l-6.8-6.8-3 3s17.3 17.3 24 16.6l1.3-4.8z" />
      <path
        fill="#F8C198"
        d="M232.9 253.3c.7-.4.8-2 0-3.4-.7-1.5-1.9-2.4-2.6-2-.8.3-.8 1.8 0 3.3.6 1.5 1.8 2.4 2.6 2z"
      />
      <path fill="url(#paint17_linear)" d="M286 264.2a7.9 7.9 0 10-.1-15.8 7.9 7.9 0 000 15.8z" />
      <path fill="#F8C198" d="M286 263.4a7.1 7.1 0 10-.1-14.2 7.1 7.1 0 000 14.2z" />
      <path fill="#F8C198" d="M287.7 261.7H284v7.1h3.6v-7.1z" />
      <path
        fill="url(#paint18_linear)"
        d="M290.9 265.5H282a3 3 0 00-2.4 1.3c-6.7.9-20.5 2.2-22-1.3l-.6.5a7 7 0 00-.4-1.3c-1-1.8-2.4-3-3.3-2.5-1 .4-1 2.3 0 4.1.2.6.6 1.2 1 1.7l-.3.3s14 6 25 5.2V296a3 3 0 003 3h8.9a3 3 0 003-3v-27.4a3 3 0 00-3-3z"
      />
      <path
        fill="#53AD9B"
        d="M290 266.1h-8.2a3 3 0 00-3 3v26a3 3 0 003 3.1h8.2a3 3 0 003-3v-26a3 3 0 00-3-3z"
      />
      <path
        fill="#53AD9B"
        d="M282.8 266.9s-22.7 3.7-24.5-.8l-3.6 2.7s17 7.1 27.6 4.5c10.7-2.7.5-6.4.5-6.4z"
      />
      <path
        fill="#F8C198"
        d="M257.2 269.3c.9-.4.9-2.2 0-4-.8-1.7-2.2-2.8-3.1-2.4-.9.4-1 2.2 0 4 .8 1.8 2.2 2.9 3 2.4z"
      />
      <path
        fill="url(#paint19_linear)"
        d="M279 248.6a.9.9 0 01.8.5c.8-1.6 2.5-2.5 4.2-2.8 1.8-.2 3.6.2 5.2.8 2.2.7 4.3 1.7 5.9 3.3a7.9 7.9 0 012.4 6c-.1 1.7-.9 3.3-1.7 4.7a6 6 0 01-1.9 2.4c-1.8 1.2-4.3 0-5.3-2-.3-.6-.5-1.3-.9-1.9-1-1.8-3.3-2.6-5.2-3.5-3.3-1.7-3.6-4-3.6-7.5z"
      />
      <path fill="url(#paint20_linear)" d="M309 272.4h-64.3V328H309v-55.6z" />
      <path fill="#F5F5F5" d="M307.6 272.4h-61V325h61v-52.7z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M306.8 272.4l2.6-48.2m-61.3 48.2l-3.4-48.2"
      />
      <path
        fill="#fff"
        d="M279.9 256a7.1 7.1 0 016.5-7.1h-.5a7.1 7.1 0 000 14.2h.5a7.1 7.1 0 01-6.5-7.1zm-27.1-.8a7.1 7.1 0 016.6-7h-.6a7.1 7.1 0 000 14.2h.6a7.1 7.1 0 01-6.6-7.2z"
        opacity="0.2"
      />
      <path
        fill="#FCCC63"
        d="M256.7 260.7l1.1.9c1.3 1.6-1.1 4-.2 5.9.4.8 1.3 1.2 1.8 2 .8 1.5-.6 3.7.6 5l1 .9c.5.8-.2 1.8 0 2.7 0 1.1 1.3 1.7 2.4 2.1.9.4 2.1.7 2.7-.1l.7-1.3c.5-.7 1.6-.7 2.3-1.1 1.2-.7 1.5-2.3 1.5-3.7 0-1.4-.1-2.9.7-4 .8-1.4 2.6-1.9 3.4-3.2 1.3-2 0-4.8.8-7 .4-.8 1-1.4 1.1-2.2.3-1.4-.5-2.7-1.5-3.6-1-.9-2.2-1.6-3-2.7-.7-.8-1-1.6-1.8-2.3-1.7-1.6-4.4-1-6.6-1.5-2.1-.5-4-2-6.2-1.7-1.8.2-3.3 1.7-4.6 3-.4.3-.6.7-.7 1.1-.4 1.9 1.4 3.8 2.2 5.1 1 1.8.7 4.3 2.3 5.7z"
      />
      <path
        fill="#fff"
        d="M252.9 250.3c1.3-1.3 2.7-2.8 4.6-3 2.1-.2 4 1.2 6.2 1.7s5-.1 6.6 1.5c.7.6 1.1 1.6 1.7 2.3.8 1 2 1.8 3 2.7a5 5 0 011.6 2.2c.3-1.4-.5-2.8-1.5-3.7-1-.9-2.3-1.6-3.1-2.6-.6-.8-1-1.7-1.7-2.4-1.7-1.5-4.4-1-6.6-1.5-2.1-.4-4-1.9-6.2-1.6-1.9.2-3.3 1.6-4.6 3-.4.3-.6.7-.8 1v1.4l.8-1zM261 277v1.5c.1-.5.3-1 0-1.6zm-1.4-5.4a7 7 0 000 2v-2zm15.7-6.6zm-4.7 9.4V273.8v.6zM258 263.6c-.2 1.2-.9 2.5-.5 3.6.2-1.3 1-2.6.6-3.6z"
        opacity="0.2"
      />
      <path
        fill="#263238"
        d="M279.5 249a.8.8 0 01.8.5c.7-1.5 2.3-2.5 4-2.7 1.6-.2 3.3.2 4.9.8 2 .6 4 1.6 5.5 3a7.4 7.4 0 012.3 5.8c-.1 1.6-.9 3-1.6 4.4-.5.8-1 1.7-1.8 2.2-1.7 1.1-4.1 0-5-1.8l-.8-1.8c-1-1.8-3.2-2.5-5-3.4-3.1-1.6-3.4-3.8-3.3-7z"
      />
      <path
        fill="#fff"
        d="M279.5 249.7a.8.8 0 01.8.5c.7-1.5 2.3-2.4 4-2.6 1.6-.3 3.3.1 4.9.7 2 .7 4 1.6 5.5 3.1 1.3 1.3 2.2 3 2.3 4.8.2-2-.8-4-2.3-5.5a14.5 14.5 0 00-5.5-3.1 11 11 0 00-4.9-.8c-1.6.2-3.3 1.2-4 2.7a.8.8 0 00-.8-.5v.7z"
        opacity="0.2"
      />
      <path fill="#FFB8D2" d="M287.3 221h-22.7v7.9h22.7v-8z" />
      <path
        fill="#000"
        d="M280.3 10.8l-3.6.1c49.2 2.1 94.5 47.4 94.5 103s-45.3 100.9-94.5 103h3.6c50.6 0 98-46 98-103s-47.4-103-98-103z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M183.6 114.3C183.6 58 234 12.5 284 11.3l-2.2-.1c-50.6 0-102.4 46.1-102.4 103 0 57 51.8 103.1 102.4 103.1h2.2c-49.9-1.3-100.3-47-100.3-103z"
        opacity="0.2"
      />
      <path fill="#FFB8D2" d="M309.7 202.9h-65.4v21.3h65.4v-21.3z" />
      <path
        fill="#fff"
        d="M244.3 18.7s-77.6 88.9 0 191.1H270s-70.8-84.5-3.3-197.5l-12.6 2.9-9.8 3.5zm67.6-1.4s77.7 90.2 0 192.5h-25.7s70.9-85.3 3.3-198.3l12.6 2.6 9.8 3.2zM375.6 33.7zm-.2-.7v.2zM366 13.5c0-7 6.2-12.7 12.4-12.9h-.3c-6.3 0-12.7 5.8-12.7 12.9 0 7 6.4 12.8 12.7 12.8h.3a13.3 13.3 0 01-12.5-12.8z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M373.5 1.6s-9.7 11 0 23.8h3.2s-8.9-10.6-.4-24.6l-1.6.3-1.2.5z"
        opacity="0.2"
      />
    </animated.g>
  );
};

export default LargeBalloon;
