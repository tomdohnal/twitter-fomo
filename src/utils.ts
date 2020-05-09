import { NAVBAR_HEIGHTS } from './components/Navbar';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLayoutEffect } from 'react-layout-effect';
import throttle from 'lodash.throttle';
import { useBreakpointValue } from '@chakra-ui/core';

export const useIsHovered = (): [
  boolean,
  {
    onMouseOver: () => void;
    onMouseOut: () => void;
  },
] => {
  const [isHovered, setIsHovered] = useState(false);

  const listeners = {
    onMouseOver() {
      setIsHovered(true);
    },
    onMouseOut() {
      setIsHovered(false);
    },
  };

  return [isHovered, listeners];
};

export const useActiveId = (ids: string[]): string => {
  const [intersectingSections, setIntersectingSections] = useState<Element[]>([]);
  const [currentActiveSectionId, setCurrentActiveSectionId] = useState<string>(ids[0]);
  const isBelowLg = useBreakpointValue({ base: true, lg: false });

  useLayoutEffect(() => {
    const elements = ids.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // if the elements is in the viewport, add it to
            // the `intersectionSections`
            if (!intersectingSections.includes(entry.target)) {
              setIntersectingSections((prevIntersectingSections) => [
                ...prevIntersectingSections,
                entry.target,
              ]);
            }
          } else {
            // if the elements is NO LONGER in the viewport,
            // remove it from the `intersectionSections`
            if (intersectingSections.includes(entry.target)) {
              setIntersectingSections((prevIntersectingSections) =>
                prevIntersectingSections.filter((section) => section.id !== entry.target.id),
              );
            }
          }
        });
      },
      { rootMargin: `${-(isBelowLg ? NAVBAR_HEIGHTS.MOBILE : NAVBAR_HEIGHTS.DESKTOP + 32)}px` },
    );

    elements.forEach((el) => el && observer.observe(el));

    if (intersectingSections.length) {
      const newCurrentActiveSectionId = intersectingSections
        .slice()
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0].id;

      if (currentActiveSectionId !== newCurrentActiveSectionId) {
        setCurrentActiveSectionId(newCurrentActiveSectionId);
      }
    }

    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
    };
  }, [currentActiveSectionId, ids, intersectingSections, isBelowLg]);

  return currentActiveSectionId;
};

export const SCROLL_DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  INITIAL: 'INITIAL',
};

export function useScrollInfo() {
  const [isBelowFirstFold, setIsBelowFirstFold] = useState(false);
  const [isLastFold, setIsLastFold] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(SCROLL_DIRECTIONS.INITIAL);
  const lastPageYOffsetRef = useRef<null | number>(null);

  const calculateScrollInfo = useCallback(
    throttle(() => {
      const { pageYOffset, innerHeight } = window;
      const prevPageYOffset = lastPageYOffsetRef.current;

      if (pageYOffset > innerHeight && !isBelowFirstFold) {
        setIsBelowFirstFold(true);
      }

      if (pageYOffset < innerHeight && isBelowFirstFold) {
        setIsBelowFirstFold(false);
      }

      if (pageYOffset > document.documentElement.scrollHeight - innerHeight * 2 && !isLastFold) {
        setIsLastFold(true);
      }

      if (pageYOffset > document.documentElement.scrollHeight - innerHeight * 2 && isLastFold) {
        setIsLastFold(false);
      }

      if (lastPageYOffsetRef.current !== null && prevPageYOffset !== null) {
        if (pageYOffset < prevPageYOffset && scrollDirection !== SCROLL_DIRECTIONS.UP) {
          setScrollDirection(SCROLL_DIRECTIONS.UP);
        }

        if (pageYOffset > prevPageYOffset && scrollDirection !== SCROLL_DIRECTIONS.DOWN) {
          setScrollDirection(SCROLL_DIRECTIONS.DOWN);
        }
      }

      lastPageYOffsetRef.current = pageYOffset;
    }, 100),
    [isBelowFirstFold, scrollDirection],
  );

  useEffect(() => {
    lastPageYOffsetRef.current = window.pageYOffset;
    window.addEventListener('scroll', calculateScrollInfo);

    // call the function in order to get the initial values even when the user
    // doesn't scroll
    calculateScrollInfo();

    return () => {
      window.removeEventListener('scroll', calculateScrollInfo);
    };
  }, [calculateScrollInfo, isBelowFirstFold]);

  return { isBelowFirstFold, scrollDirection, isLastFold };
}
