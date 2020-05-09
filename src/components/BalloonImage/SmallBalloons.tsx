import React, { useRef } from 'react';
import { animated } from 'react-spring';
import { getTransformOrigin } from '../../svg-utils';

const SmallBalloons: React.FC<{
  animationStyles: any[];
}> = ({ animationStyles }) => {
  const refs = useRef<SVGGElement[]>([]);

  const balloons = [
    <>
      <path
        fill="url(#paint6_linear)"
        d="M110.5 38.6c0 7.6-6.2 13.7-13 13.7C91 52.3 84 46.2 84 38.6 84 31.1 90.9 25 97.6 25c6.6 0 13 6.1 13 13.6z"
      />
      <path
        fill="#47E6B1"
        d="M110 38.6c0 7.2-6 13-12.5 13-6.3 0-12.9-5.8-12.9-13 0-7.1 6.6-13 13-13 6.3 0 12.3 5.9 12.3 13z"
      />
      <path fill="url(#paint7_linear)" d="M101.2 58.6H93v7h8v-7z" />
      <path fill="#E6E6E6" d="M101 58.6h-7.7v6.6h7.7v-6.6z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M100.9 58.6l.3-6m-7.7 6l-.4-6"
      />
      <path fill="#fff" d="M95.1 59.2zm-.1-.7z" opacity="0.2" />
      <path fill="#47E6B1" d="M98.4 52.1h-2.8v1h2.8v-1z" />
      <path
        fill="#000"
        d="M97.6 25.6H97a13 13 0 010 26h.5c6.3 0 12.3-5.8 12.3-13s-6-13-12.3-13z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M85.3 38.6c0-7 6.4-12.8 12.7-13h-.3c-6.4 0-13 5.9-13 13 0 7.2 6.6 13 13 13h.3c-6.3-.1-12.7-5.9-12.7-13z"
        opacity="0.2"
      />
      <path fill="#47E6B1" d="M101.3 49.8H93v2.7h8.3v-2.7z" />
      <path
        fill="#fff"
        d="M93 26.6s-9.8 11.2 0 24.1h3.2s-8.9-10.7-.4-25l-1.6.5-1.2.4zm8.5-.2s9.8 11.4 0 24.3h-3.2s9-10.7.4-25l1.6.3 1.2.4z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint8_linear)"
        d="M18.8 20.2c0 5.3-4.5 9.6-9.2 9.6A10 10 0 010 20.2a10 10 0 019.6-9.6c4.7 0 9.2 4.3 9.2 9.6z"
      />
      <path
        fill="#FFB8D2"
        d="M18.3 20.2c0 5-4.2 9.2-8.7 9.2a9.5 9.5 0 01-9.2-9.2c0-5 4.6-9.2 9.2-9.2 4.5 0 8.7 4.1 8.7 9.2z"
      />
      <path fill="url(#paint9_linear)" d="M12.1 34.3H6.4v5h5.7v-5z" />
      <path fill="#FFB8D2" d="M12 34.3H6.6V39H12v-4.7z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M12 34.3l.2-4.3m-5.5 4.3L6.4 30"
      />
      <path fill="#fff" d="M7.9 34.7zm-.2-.5z" opacity="0.2" />
      <path fill="#FFB8D2" d="M10.2 29.7h-2v.7h2v-.7z" />
      <path
        fill="#000"
        d="M9.6 11h-.4c4.4.2 8.4 4.2 8.4 9.1 0 5-4 9-8.4 9.2h.4c4.5 0 8.7-4 8.7-9.2 0-5-4.2-9.1-8.7-9.1z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M1 20.2c0-5 4.4-9 8.9-9.2h-.2a9.5 9.5 0 00-9.1 9.2c0 5 4.6 9.2 9 9.2h.3c-4.5-.1-9-4.2-9-9.2z"
        opacity="0.2"
      />
      <path fill="#FFB8D2" d="M12.2 28H6.4v2h5.8v-2z" />
      <path
        fill="#fff"
        d="M6.4 11.7s-7 7.9 0 17h2.3s-6.4-7.5-.3-17.6l-1.2.2-.8.4zm6-.1s7 8 0 17.1H10s6.3-7.6.3-17.7l1.1.3.9.3z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint10_linear)"
        d="M174.7 16.6c0 5.4-4.4 9.7-9.1 9.7a10 10 0 01-9.6-9.7 10 10 0 019.6-9.6c4.7 0 9.1 4.3 9.1 9.6z"
      />
      <path
        fill="#F55F44"
        d="M174.3 16.6c0 5.1-4.2 9.2-8.8 9.2a9.5 9.5 0 01-9-9.2c0-5 4.5-9.1 9-9.1s8.8 4 8.8 9.1z"
      />
      <path fill="url(#paint11_linear)" d="M168.1 30.7h-5.7v5h5.7v-5z" />
      <path fill="#E6E6E6" d="M168 30.7h-5.4v4.7h5.4v-4.7z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M168 30.7l.1-4.3m-5.4 4.3l-.3-4.3"
      />
      <path fill="#fff" d="M163.8 31.1v.1zm-.1-.4z" opacity="0.2" />
      <path fill="#F55F44" d="M166.2 26.1h-2v.8h2V26z" />
      <path
        fill="#000"
        d="M165.5 7.4h-.3c4.4.2 8.4 4.2 8.4 9.2 0 5-4 9-8.4 9.2h.3c4.6 0 8.8-4.1 8.8-9.2 0-5-4.2-9.2-8.8-9.2z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M157 16.6c0-5 4.4-9 8.9-9.1h-.2a9.5 9.5 0 00-9.2 9.1c0 5.1 4.7 9.2 9.2 9.2h.2c-4.5-.1-9-4.2-9-9.2z"
        opacity="0.2"
      />
      <path fill="#F55F44" d="M168.2 24.5h-5.9v2h5.9v-2z" />
      <path
        fill="#fff"
        d="M162.3 8.1s-6.9 8 0 17h2.3s-6.3-7.5-.3-17.6l-1.1.3-.9.3zm6.1-.1s6.9 8 0 17.2H166s6.3-7.6.3-17.7l1.1.2.9.3z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint12_linear)"
        d="M49 88.4c0 7.9-6.6 14.3-13.6 14.3s-14.2-6.4-14.2-14.3c0-8 7.2-14.3 14.2-14.3 7 0 13.6 6.4 13.6 14.3z"
      />
      <path
        fill="#F55F44"
        d="M48.4 88.4c0 7.5-6.3 13.6-13 13.6s-13.6-6-13.6-13.6 7-13.7 13.6-13.7c6.7 0 13 6.1 13 13.7z"
      />
      <path fill="url(#paint13_linear)" d="M39.2 109.3h-8.5v7.4h8.5v-7.4z" />
      <path fill="#E6E6E6" d="M39 109.3h-8v7h8v-7z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M39 109.3l.2-6.4m-8.1 6.4l-.4-6.4"
      />
      <path fill="#fff" d="M32.9 109.9zm-.2-.7z" opacity="0.2" />
      <path fill="#F55F44" d="M36.3 102.5h-3v1h3v-1z" />
      <path
        fill="#000"
        d="M35.4 74.7h-.5a13.7 13.7 0 010 27.3h.5c6.7 0 13-6.2 13-13.7 0-7.5-6.3-13.6-13-13.6z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M22.6 88.4c0-7.4 6.7-13.5 13.3-13.6h-.3c-6.7 0-13.6 6-13.6 13.6 0 7.5 7 13.6 13.6 13.6h.3a14.2 14.2 0 01-13.3-13.6z"
        opacity="0.2"
      />
      <path fill="#F55F44" d="M39.3 100.1h-8.7v2.8h8.7v-2.8z" />
      <path
        fill="#fff"
        d="M30.6 75.7s-10.2 11.8 0 25.3H34s-9.3-11.2-.4-26.1l-1.7.4-1.3.4zm9-.1s10.3 11.9 0 25.4h-3.4s9.4-11.2.4-26.2l1.7.3 1.3.5z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint21_linear)"
        d="M392.2 13.5c0 7.4-6.2 13.5-12.8 13.5A14 14 0 01366 13.5 14 14 0 01379.4 0c6.6 0 12.8 6 12.8 13.5z"
      />
      <path
        fill="#4D8AF0"
        d="M391.6 13.5c0 7-6 12.8-12.2 12.8-6.3 0-12.8-5.7-12.8-12.8 0-7.1 6.5-12.9 12.8-12.9 6.3 0 12.2 5.8 12.2 12.9z"
      />
      <path fill="url(#paint22_linear)" d="M383 33.2h-8v7h8v-7z" />
      <path fill="#E6E6E6" d="M382.8 33.2h-7.6v6.5h7.6v-6.5z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M382.7 33.2l.3-6m-7.6 6l-.5-6"
      />
      <path fill="#FFCC80" d="M380.3 26.8h-2.9v1h2.9v-1z" />
      <path
        fill="#000"
        d="M379.4.6h-.5a12.9 12.9 0 010 25.7h.5c6.3 0 12.2-5.8 12.2-12.9 0-7-6-12.8-12.2-12.8z"
        opacity="0.2"
      />
      <path fill="#FFCC80" d="M383 24.5h-8v2.7h8.1v-2.7z" />
      <path
        fill="#fff"
        d="M383.3 1.4a19 19 0 000 24h-3.2s8.8-10.6.4-24.7l1.6.3 1.2.4z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint23_linear)"
        d="M444 16.1c0 8-6.7 14.3-13.7 14.3-7 0-14.2-6.4-14.2-14.3s7.2-14.3 14.2-14.3c7 0 13.6 6.4 13.6 14.3z"
      />
      <path
        fill="#FFB8D2"
        d="M443.3 16.1c0 7.6-6.3 13.7-13 13.7s-13.6-6.2-13.6-13.7c0-7.5 7-13.6 13.6-13.6s13 6.1 13 13.6z"
      />
      <path fill="url(#paint24_linear)" d="M434 37h-8.4v7.4h8.5V37z" />
      <path fill="#FFB8D2" d="M433.9 37h-8v7h8v-7z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M433.8 37l.3-6.3M426 37l-.4-6.3"
      />
      <path fill="#fff" d="M427.7 37.6zm-.1-.6v-.2z" opacity="0.2" />
      <path fill="#FFB8D2" d="M431.2 30.2h-3v1h3v-1z" />
      <path
        fill="#000"
        d="M430.3 2.4h-.5a13.7 13.7 0 010 27.3h.5c6.7 0 13-6.1 13-13.6s-6.3-13.7-13-13.7z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M417.5 16.1c0-7.4 6.7-13.4 13.3-13.6h-.3c-6.7 0-13.6 6.1-13.6 13.6s7 13.7 13.6 13.7h.3A14.2 14.2 0 01417.5 16z"
        opacity="0.2"
      />
      <path fill="#FFB8D2" d="M434.2 27.8h-8.7v2.9h8.7v-2.9z" />
      <path
        fill="#fff"
        d="M425.5 3.5s-10.2 11.7 0 25.3h3.4s-9.3-11.2-.4-26.2l-1.7.4-1.3.5zm9-.2s10.2 12 0 25.5H431s9.3-11.3.4-26.2l1.7.3 1.3.4z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint25_linear)"
        d="M417.5 89.2c0 7-6 12.7-12.4 12.7s-13-5.7-13-12.7c0-7 6.6-12.7 13-12.7a13 13 0 0112.4 12.7z"
      />
      <path
        fill="#F55F44"
        d="M417 89.2c0 6.7-5.8 12.1-12 12.1-6 0-12.3-5.4-12.3-12.1 0-6.7 6.3-12.1 12.4-12.1 6 0 11.8 5.4 11.8 12z"
      />
      <path fill="url(#paint26_linear)" d="M408.6 107.8h-7.8v6.6h7.8v-6.6z" />
      <path fill="#E6E6E6" d="M408.4 107.8H401v6.2h7.4v-6.2z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M408.3 107.8l.3-5.7m-7.4 5.7l-.4-5.7"
      />
      <path fill="#fff" d="M402.8 108.4zm-.2-.7z" opacity="0.2" />
      <path fill="#F55F44" d="M406 101.8h-2.8v.9h2.7v-1z" />
      <path
        fill="#000"
        d="M405 77h-.4c6 .3 11.5 5.6 11.5 12.1 0 6.6-5.5 12-11.5 12.2h.5c6 0 11.8-5.5 11.8-12.2 0-6.7-5.7-12-11.8-12z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M393.4 89.2c0-6.6 6.1-12 12.1-12.1h-.3c-6 0-12.3 5.4-12.3 12.1 0 6.7 6.2 12.1 12.3 12.1h.3c-6-.1-12.1-5.5-12.1-12.1z"
        opacity="0.2"
      />
      <path fill="#F55F44" d="M408.6 99.6h-7.9v2.6h8v-2.6z" />
      <path
        fill="#fff"
        d="M400.7 78s-9.4 10.4 0 22.5h3.1s-8.5-10-.4-23.3l-1.5.3-1.2.4zm8.2-.2s9.4 10.6 0 22.7h-3.1s8.6-10 .4-23.4l1.5.3 1.2.4z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint27_linear)"
        d="M445 167c0 7.8-6.5 14-13.4 14s-14-6.3-14-14c0-7.8 7.1-14 14-14s13.4 6.2 13.4 14z"
      />
      <path
        fill="#47E6B1"
        d="M444.4 167c0 7.4-6.2 13.4-12.8 13.4-6.6 0-13.3-6-13.3-13.4s6.7-13.4 13.3-13.4c6.6 0 12.8 6 12.8 13.4z"
      />
      <path fill="url(#paint28_linear)" d="M435.3 187.6H427v7.2h8.3v-7.2z" />
      <path fill="#E6E6E6" d="M435.1 187.6h-7.9v6.8h8v-6.8z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M435 187.6l.4-6.3m-8 6.3l-.4-6.3"
      />
      <path fill="#fff" d="M429 188.1v.2c.1 0 .1 0 0-.2zm-.1-.6z" opacity="0.2" />
      <path fill="#47E6B1" d="M432.5 180.9h-3v1h3v-1z" />
      <path
        fill="#000"
        d="M431.6 153.5h-.5a13.5 13.5 0 010 26.8h.5c6.6 0 12.8-6 12.8-13.4s-6.2-13.4-12.8-13.4z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M419 167a14 14 0 0113-13.4h-.2c-6.6 0-13.3 6-13.3 13.4s6.7 13.4 13.3 13.4h.3a14 14 0 01-13-13.4z"
        opacity="0.2"
      />
      <path fill="#47E6B1" d="M435.4 178.5H427v2.8h8.5v-2.8z" />
      <path
        fill="#fff"
        d="M427 154.6s-10.2 11.5 0 24.8h3.3s-9.3-11-.5-25.7l-1.6.4-1.3.5z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M435.7 154.4a20 20 0 000 25h-3.3s9.2-11 .4-25.8l1.6.4 1.3.4z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint0_linear)"
        d="M131.8 20.2c0 6.4-5.5 11.5-11.3 11.5-5.8 0-11.7-5.1-11.7-11.5s6-11.5 11.7-11.5c5.9 0 11.3 5.2 11.3 11.5z"
      />
      <path
        fill="#FFB8D2"
        d="M131.3 20.2c0 6-5.2 11-10.8 11-5.5 0-11.2-5-11.2-11s5.7-11 11.2-11c5.6 0 10.8 5 10.8 11z"
      />
      <path fill="url(#paint1_linear)" d="M123.7 37h-7v6h7v-6z" />
      <path fill="#FFB8D2" d="M123.5 37H117v5.7h6.6V37z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M123.4 37l.3-5m-6.7 5l-.4-5"
      />
      <path fill="#fff" d="M118.4 37.5zm-.1-.5z" opacity="0.2" />
      <path fill="#FFB8D2" d="M121.3 31.6h-2.5v.8h2.5v-.8z" />
      <path
        fill="#000"
        d="M120.5 9.2h-.3c5.3.2 10.3 5 10.3 11 0 5.9-5 10.7-10.3 11h.3c5.6 0 10.8-5 10.8-11 0-6.1-5.2-11-10.8-11z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M110 20.2c0-6 5.5-10.8 11-11h-.3c-5.5 0-11.2 5-11.2 11s5.7 11 11.2 11h.2c-5.4-.1-11-5-11-11z"
        opacity="0.2"
      />
      <path fill="#FFB8D2" d="M123.8 29.7h-7.2v2.2h7.2v-2.2z" />
      <path
        fill="#fff"
        d="M116.6 10s-8.5 9.5 0 20.4h2.8s-7.7-9-.3-21l-1.4.3-1.1.3zm7.4-.1s8.5 9.6 0 20.5h-2.8s7.7-9 .3-21.1l1.4.2 1 .4z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint2_linear)"
        d="M49 190c0 8.9-7.7 16.1-15.8 16.1-8.1 0-16.4-7.2-16.4-16.1 0-8.9 8.3-16.1 16.4-16.1 8 0 15.7 7.2 15.7 16z"
      />
      <path fill="url(#paint3_linear)" d="M37.6 213.6h-9.9v8.2h9.9v-8.2z" />
      <path fill="#fff" d="M30.2 214.2zm-.2-.7z" opacity="0.2" />
      <path fill="#4D8AF0" d="M34.2 205.9h-3.4v1.2h3.4v-1.2z" />
      <path
        fill="#000"
        d="M33.2 174.6h-.6c7.5.3 14.5 7 14.5 15.3s-7 15-14.5 15.4h.6c7.7 0 15-6.9 15-15.4 0-8.4-7.3-15.3-15-15.3z"
        opacity="0.2"
      />
      <path fill="#4D8AF0" d="M37.7 203.2h-10v3.2h10v-3.2z" />
      <path
        fill="#4D8AF0"
        d="M48.2 190c0 8.5-7.3 15.4-15 15.4-7.8 0-15.7-7-15.7-15.4 0-8.5 8-15.4 15.7-15.4 7.7 0 15 7 15 15.4z"
      />
      <path fill="#FFB8D2" d="M37.3 213.6H28v7.8h9.3v-7.8z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M37.2 213.6l.4-7.2m-9.3 7.2l-.6-7.2"
      />
      <path
        fill="#fff"
        d="M18.4 190c0-8.4 7.7-15.2 15.3-15.4h-.3c-7.8 0-15.7 7-15.7 15.4 0 8.5 8 15.4 15.7 15.4h.3c-7.6-.2-15.3-7-15.3-15.4z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M27.7 175.8s-12 13.2 0 28.4h3.9s-10.8-12.5-.5-29.4l-2 .4-1.4.6zm10.3-.2s12 13.4 0 28.6h-4s11-12.7.6-29.5l2 .4 1.4.5z"
        opacity="0.2"
      />
    </>,
    <>
      <path
        fill="url(#paint4_linear)"
        d="M167.7 164.8c0 10.2-8.7 18.4-18 18.4-9.2 0-18.7-8.2-18.7-18.4s9.4-18.4 18.7-18.4c9.3 0 18 8.2 18 18.4z"
      />
      <path
        fill="#47E6B1"
        d="M166.8 164.8c0 9.7-8.3 17.5-17.1 17.5s-17.9-7.8-17.9-17.5 9-17.5 17.9-17.5c8.8 0 17.1 7.8 17.1 17.5z"
      />
      <path fill="url(#paint5_linear)" d="M154.7 191.7h-11.2v9.5h11.2v-9.5z" />
      <path fill="#F2F2F2" d="M154.5 191.7h-10.7v9h10.7v-9z" />
      <path
        stroke="#AD7676"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M154.3 191.7l.5-8.2m-10.8 8.2l-.5-8.2"
      />
      <path fill="#fff" d="M146.3 192.5zm-.3-.9z" opacity="0.2" />
      <path fill="#47E6B1" d="M151 183h-4v1.3h4v-1.4z" />
      <path
        fill="#000"
        d="M149.7 147.2h-.6c8.6.4 16.5 8 16.5 17.5s-8 17.2-16.5 17.5h.6c8.8 0 17.1-7.8 17.1-17.5s-8.3-17.5-17.1-17.5z"
        opacity="0.2"
      />
      <path
        fill="#fff"
        d="M132.8 164.8c0-9.6 8.8-17.3 17.5-17.5h-.4c-8.8 0-17.8 7.8-17.8 17.5s9 17.5 17.9 17.5h.3c-8.7-.2-17.5-8-17.5-17.5z"
        opacity="0.2"
      />
      <path fill="#47E6B1" d="M154.8 179.9h-11.4v3.6h11.4v-3.6z" />
      <path
        fill="#fff"
        d="M143.4 148.6s-13.5 15 0 32.4h4.5s-12.4-14.3-.6-33.5l-2.2.4-1.7.7zm11.8-.3s13.6 15.4 0 32.8h-4.5s12.4-14.5.6-33.7l2.2.4 1.7.5z"
        opacity="0.2"
      />
    </>,
  ];

  return (
    <>
      {balloons.map((balloon, index) => (
        <animated.g
          style={{
            ...animationStyles[index],
            transformOrigin: getTransformOrigin(refs.current[index]),
          }}
          ref={(ref: SVGGElement | null) => {
            if (ref) {
              refs.current[index] = ref;
            }
          }}
          key={index}
        >
          {balloon}
        </animated.g>
      ))}
    </>
  );
};

export default SmallBalloons;
