import memoize from 'lodash.memoize';

export function rad2deg(rad: number) {
  return (180 * rad) / Math.PI;
}

export const getTransformOrigin = memoize(function getTransformOrigin(element: SVGGElement | null) {
  if (!element) {
    return '0px 0px';
  }

  const { width, height, x, y } = element.getBBox();

  return `${x + width / 2}px ${y + height / 2}px`;
});

export const getSvgTransformStyle = ({
  x,
  path,
  element,
  baseRotation = 0,
}: {
  x: any; // react-spring types are not performant :()
  path: SVGPathElement | null;
  element: SVGGElement | null;
  baseRotation: number;
}) => {
  return x.to((animatedX: number) => {
    if (animatedX === 0 || !path || !element) {
      // make it off-screen initially
      return 'translate(-9999px,-9999px) rotate(0deg)';
    }

    const pathLength = path.getTotalLength();

    const dist = animatedX * pathLength;
    const pos = path.getPointAtLength(dist);
    let angle;

    if (dist + 1 <= pathLength) {
      const posAhead = path.getPointAtLength(dist + 1);
      angle = Math.atan2(posAhead.y - pos.y, posAhead.x - pos.x);
    } else {
      const posBehind = path.getPointAtLength(dist - 1);
      angle = Math.atan2(pos.y - posBehind.y, pos.x - posBehind.x);
    }
    const { width, height, x, y } = element.getBBox();

    const translate = `translate(${pos.x - x - width / 2}px, ${pos.y - y - height / 2}px)`;

    const rotate = `rotate(${rad2deg(angle) + baseRotation}deg)`;

    return `${translate} ${rotate}`;
  });
};
