import React, { cloneElement, useRef } from 'react';
import { animated, SpringValues } from 'react-spring';
import { getSvgTransformStyle, getTransformOrigin } from '../../svg-utils';

const LEAVE_ITEMS = [
  {
    path: (
      <path d="M-170 247C-134.125 260.376 -89.4643 253.457 -66.0357 251.151C-7.26033 245.365 53.3035 247.922 76 252.996" />
    ),
    item: (
      <animated.g>
        <path
          fill="#007ACC"
          d="M71.307 249.732l-3.306 5.731 5.729 3.311 5.729 3.31 3.306-5.732 3.307-5.731-5.73-3.311-5.728-3.31-3.307 5.732z"
        />
        <path
          fill="#fff"
          d="M73.819 251.235l-.275.467.746.431.746.431-1.223 2.12-1.223 2.12.528.304.527.305 1.223-2.12 1.223-2.12.746.431.745.431.266-.46c.147-.255.264-.471.26-.481-.001-.01-.907-.538-2.008-1.172l-2.006-1.152-.275.465z"
        />
        <path
          fill="#fff"
          d="M80.808 254.631c.249.241.396.498.478.827.04.174.078.47.063.526-.005.017-.697.064-1.107.077-.015.001-.031-.072-.038-.173-.024-.3-.125-.482-.352-.635-.334-.224-.662-.171-.836.134a.484.484 0 00-.074.243c-.015.202.072.379.406.829.617.827.834 1.263.86 1.72.031.51-.254 1.131-.673 1.474-.456.372-1.094.435-1.791.176a4.068 4.068 0 01-.868-.514c-.413-.348-.718-.827-.815-1.281-.039-.178-.069-.6-.043-.615a.961.961 0 01.144-.006h.567l.44-.001.01.142c.011.203.106.527.194.668.255.404.772.667 1.148.588a.487.487 0 00.347-.258.484.484 0 00.083-.34c-.016-.179-.136-.392-.523-.914-.444-.596-.608-.902-.696-1.287-.05-.224-.043-.53.016-.755.05-.188.273-.6.402-.744.452-.5 1.113-.65 1.803-.409.224.079.685.364.855.528z"
        />
      </animated.g>
    ),
    baseRotation: -40,
  },
  {
    path: (
      <path d="M422.5 217c-11.167 4.5-61 11.72-82.5 10-12.5-1-40.102-.838-65.5 8.5-34 12.5-39.5 26.849-48.5 40.5" />
    ),
    item: (
      <animated.g>
        <path
          fill="#41B883"
          d="M232.131 273.149l3.13.665-10.694 11.835-4.956-15.162 3.091.657 2.895.616 1.174 3.521 2.465-2.748 2.895.616z"
        />
        <path
          fill="#41B883"
          d="M219.611 270.487l4.956 15.162 10.694-11.835-3.13-.665-6.416 7.101-3.013-9.106-3.091-.657z"
        />
        <path
          fill="#35495E"
          d="M222.702 271.144l3.005 9.145 6.424-7.14-2.895-.616-2.465 2.748-1.174-3.521-2.895-.616z"
        />
      </animated.g>
    ),
    baseRotation: -120,
  },
  {
    path: (
      <path d="M455.5 250.5c-11.167 4.5-24 7.72-45.5 6-12.5-1-52.912-14.03-79.5-9-37 7-54 23-69 35.5" />
    ),
    item: (
      <animated.path
        fill="#A30664"
        d="M263.41 286.381C259.544 289.971 254 290 254 290s.724-5.791 4.59-9.381C262.456 277.029 268 277 268 277s-.724 5.791-4.59 9.381z"
      />
    ),
    baseRotation: 45,
  },
  {
    path: (
      <path d="M-188 271.87C-141.247 268.615 -132.049 275.543 -88.3618 275.543C-42.4437 275.543 -4.05263 268.611 45 279" />
    ),
    item: (
      <animated.path
        fill="#A30664"
        d="M44.623 283.527c-5.247-2.523-7.623-8.095-7.623-8.095s6.13-1.481 11.377 1.041c5.247 2.523 7.623 8.095 7.623 8.095s-6.13 1.481-11.377-1.041z"
      />
    ),
    baseRotation: -27,
  },
  {
    path: (
      <path d="M403.5 214.151c-11.167 4.5-24 7.72-45.5 6-12.5-1-52.912-14.031-79.5-9-37 7-53.5 23.349-68.5 35.849" />
    ),
    item: (
      <animated.path
        fill="#A30664"
        d="M212.754 250.824C208.336 254.966 202 255 202 255s.828-6.682 5.246-10.824C211.664 240.033 218 240 218 240s-.828 6.682-5.246 10.824z"
      />
    ),
    baseRotation: 45,
  },
  {
    path: <path d="M421.5 240.151C369.5 249.5 310 230.5 265 238.5" />,
    item: (
      <animated.g>
        <path
          fill="#fff"
          d="M254.059 238.978c0 1.671 1.466 3.231 3.777 4.11-.462 2.586-.083 4.67 1.182 5.482 1.301.835 3.238.257 5.077-1.532 1.792 1.717 3.604 2.393 4.868 1.578 1.299-.837 1.694-3.062 1.22-5.729 2.407-.886 3.753-2.216 3.753-3.909 0-1.632-1.468-3.044-3.748-3.917.51-2.777.078-4.811-1.24-5.656-1.27-.816-3.103-.105-4.921 1.657-1.892-1.87-3.707-2.441-5.023-1.593-1.269.818-1.631 2.94-1.168 5.573-2.233.867-3.777 2.311-3.777 3.936z"
        />
        <path
          fill="#53C1DE"
          d="M269.705 235.928a11.42 11.42 0 00-.568-.199c.032-.146.061-.29.087-.431.431-2.325.149-4.197-.811-4.813-.921-.591-2.427.025-3.948 1.498-.146.142-.293.292-.44.449a12.027 12.027 0 00-.292-.301c-1.594-1.575-3.192-2.239-4.152-1.621-.92.593-1.192 2.353-.805 4.556.037.213.081.43.131.651-.227.071-.445.147-.654.228-1.869.726-3.062 1.862-3.062 3.041 0 1.218 1.281 2.439 3.228 3.18.153.058.313.114.477.166-.053.239-.1.473-.139.702-.369 2.164-.081 3.882.837 4.472.948.608 2.538-.017 4.087-1.524.123-.119.246-.246.369-.378.159.171.318.333.477.484 1.5 1.437 2.982 2.018 3.899 1.427.946-.61 1.254-2.456.855-4.703a13.209 13.209 0 00-.106-.525c.112-.036.221-.074.328-.114 2.024-.746 3.341-1.953 3.341-3.187 0-1.183-1.233-2.327-3.139-3.058z"
        />
        <path
          fill="#fff"
          d="M269.266 241.376c-.097.036-.196.07-.297.104a20.928 20.928 0 00-.893-2.49c.352-.844.642-1.67.859-2.452.18.058.356.119.524.184 1.634.626 2.63 1.551 2.63 2.264 0 .76-1.076 1.746-2.823 2.39zm-.725 1.599c.177.994.202 1.892.085 2.594-.105.63-.317 1.051-.578 1.219-.556.359-1.746-.107-3.029-1.336a11.873 11.873 0 01-.444-.45c.497-.606.994-1.31 1.48-2.092a15.926 15.926 0 002.39-.41c.036.162.068.32.096.475zm-7.332 3.751c-.544.214-.976.22-1.238.052-.557-.357-.788-1.737-.473-3.588.036-.212.08-.43.129-.652.723.178 1.524.306 2.379.383.489.765 1 1.468 1.515 2.084a9.233 9.233 0 01-.336.345c-.685.666-1.371 1.139-1.976 1.376zm-2.546-5.354c-.861-.328-1.572-.753-2.059-1.218-.438-.417-.659-.831-.659-1.168 0-.715.958-1.628 2.556-2.248.194-.075.397-.146.608-.213.221.8.511 1.636.86 2.482a21.881 21.881 0 00-.871 2.517 8.826 8.826 0 01-.435-.152zm.853-6.467c-.332-1.887-.111-3.311.443-3.668.591-.381 1.897.162 3.273 1.522.088.087.176.178.265.272a19.794 19.794 0 00-1.504 2.072c-.83.085-1.625.223-2.355.407a14.1 14.1 0 01-.122-.605zm7.615 2.092a28.415 28.415 0 00-.537-.982c.563.079 1.103.184 1.61.313-.152.543-.342 1.11-.565 1.692-.16-.338-.33-.68-.508-1.023zm-3.105-3.366c.347.42.696.888 1.038 1.396a20.086 20.086 0 00-2.086-.001c.343-.503.694-.971 1.048-1.395zm-3.126 3.372c-.174.337-.34.676-.498 1.016a20.176 20.176 0 01-.561-1.7 15.63 15.63 0 011.601-.306 25.2 25.2 0 00-.542.99zm.558 5.016a14.545 14.545 0 01-1.627-.291c.156-.56.348-1.142.572-1.735a25.48 25.48 0 001.055 2.026zm2.588 2.382a18.756 18.756 0 01-1.062-1.415 23.333 23.333 0 002.099-.004c-.344.52-.691.995-1.037 1.419zm3.6-4.438c.236.599.435 1.178.593 1.729a14.61 14.61 0 01-1.647.312 27.776 27.776 0 001.054-2.041zm-1.165.622a28.54 28.54 0 01-.847 1.521c-.524.041-1.065.063-1.617.063a22.31 22.31 0 01-1.598-.056 24.714 24.714 0 01-1.616-3.107c.228-.528.479-1.059.751-1.583a23.31 23.31 0 01.856-1.517 19.318 19.318 0 013.218 0 28.199 28.199 0 011.611 3.089 26.563 26.563 0 01-.758 1.59zm1.555-9.373c.591.379.821 1.909.45 3.916-.024.128-.05.259-.079.391a16.413 16.413 0 00-2.361-.415 19.405 19.405 0 00-1.492-2.073c.136-.145.271-.284.406-.415 1.303-1.262 2.521-1.76 3.076-1.404z"
        />
        <path
          fill="#53C1DE"
          d="M264.018 237.232c.87 0 1.576.785 1.576 1.754s-.706 1.755-1.576 1.755c-.871 0-1.577-.786-1.577-1.755 0-.969.706-1.754 1.577-1.754z"
        />
      </animated.g>
    ),
    baseRotation: 45,
  },
];

const Leaves: React.FC<{
  animatedValues: SpringValues<{ opacity: number; x: number }>[];
}> = ({ animatedValues }) => {
  const pathRefs = useRef<SVGPathElement[]>([]);
  const itemRefs = useRef<(SVGPathElement | SVGGElement)[]>([]);

  return LEAVE_ITEMS.map(({ path, item, baseRotation }, index) => (
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
  ));
};

export default Leaves;
