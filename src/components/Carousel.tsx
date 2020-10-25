import React, { Children, cloneElement, useState, useEffect, useRef, ReactNode } from 'react';
import { animated, useSpring, useTransition, useSprings } from 'react-spring';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/core';

// the carousel item component wraps each carousel items and
// accepts the `react-spring` style props which are used to animate its opacity
const CarouselItem: React.FC = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

const CarouselArrowContainer: React.FC<{
  activeItemIndex: number, 
  onClick: () => void,
  itemsCount: number,
  left?: boolean,
  right?: boolean,
}> = ({ activeItemIndex, left, right, itemsCount, children, onClick }) {
  const showArrow = (left && activeItemIndex > 0) || (right && activeItemIndex < itemsCount - 1);

  const transition = useTransition(showArrow, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const arrowWithProps = Children.map(children, child =>
    cloneElement(child, {
      onClick,
    }),
  );

  return transition(
    (style: any, item: boolean) => item && <animated.div style={style}>{arrowWithProps}</animated.div>,
  );
}

// `DRAG_DIRECTIONS` are used to determine which "way" the user
// swiped so that we don't accidentally move the carousel to the left/right
// when the user is scrolling down/up and moves her finger to the left/right
// a little bit.
const DRAG_DIRECTIONS = {
  UNKNOWN: 'UNKNOWN',
  VERTICAL: 'VERTICAL',
  HORIZONTAL: 'HORIZONTAL',
};

// This is used on mobiles as the carousel X position needs
// to be adjusted based on the currently active item index.
// If the currently active item index is zero (thus the first
// item is active) we don't make any adjustments.
// If it's 1 and (n - 1), it needs to move a bit to the right
// to make both left and right adjacent items visible in the viewport.
// If it's the nth item, we need to move it a little more to the right
// to fill in the white space caused by the absence of right adjacent element
// and, as a result, a larger chunk of the left adjacent item is visible
const getXAdjustment = ({
  index,
  count,
  isLgDown,
}: {
  index: number;
  count: number;
  isLgDown: boolean;
}) => {
  if (!isLgDown) {
    return 0;
  }

  if (index === 0) {
    return 0;
  }

  if (index === count - 1) {
    return 48;
  }

  return 24;
};

const Carousel: React.FC<{
  leftArrow: ReactNode,
  rightArrow: ReactNode,
  Container: React.ComponentType,
  items: ReactNode[]
}> = ({ leftArrow, rightArrow, Container, items }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const isLgDown = !!useBreakpointValue({ base: true, lg: false });

  // `styleProps` are used to animate the `transform` of the
  // container of all items which is used to make the items move
  const [styleProps, setStyleProps] = useSpring(
    () => ({
      transform: `translateX(0%) translateX(0px)`,
    }),
    [],
  );

  // `itemStyleProps` are used to give individual items
  // different opacity based on how far away they are from the
  // current item
  const [itemStyleProps, setItemStyleProps] = useSprings(
    items.length,
    items.map((_, index) => ({ opacity: index === activeItemIndex ? 1 : 0.5 })),
    [activeItemIndex],
  );

  const viewRef = useRef<null | HTMLElement>(null);

  // we use `dragState` as a ref (and NOT as a regular React state)
  // to NOT trigger React updates (which cause unnecessary perf overhead)
  const dragState = useRef({
    startX: 0,
    startY: 0,
    diffX: 0,
    dragDirection: DRAG_DIRECTIONS.UNKNOWN,
  });

  const incrementActiveItem = (incrementValue = 1) => {
    setActiveItemIndex(prevIndex => {
      const newIndex = prevIndex + incrementValue;

      const xAdjustment = getXAdjustment({ index: newIndex, count: items.length, isLgDown });

      setStyleProps({
        transform: `translateX(-${newIndex * (100 / items.length)}%) translateX(${xAdjustment}px)`,
        immediate: false,
      });

      return newIndex;
    });
  };

  const decrementActiveItem = (decrementValue = 1) => {
    setActiveItemIndex(prevIndex => {
      const newIndex = prevIndex - decrementValue;

      const xAdjustment = getXAdjustment({ index: newIndex, count: items.length, isLgDown });

      setStyleProps({
        transform: `translateX(-${newIndex * (100 / items.length)}%) translateX(${xAdjustment}px)`,
        immediate: false,
      });

      return newIndex;
    });
  };

  const onTouchStart = (e: TouchEvent) => {
    e.stopPropagation();

    // when the user starts swiping,
    // save the position which she started swiping from
    dragState.current = {
      ...dragState.current,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
    };
  };

  // User swipes. (Moves her finger on the touchscreen from one position to another.)
  const onTouchMove = (e: TouchEvent) => {
    e.stopPropagation();

    // compute the difference between the position of swipe start
    // and the swiping position
    const diffX = e.touches[0].clientX - dragState.current.startX;
    const diffY = e.touches[0].clientY - dragState.current.startY;

    if (dragState.current.dragDirection === DRAG_DIRECTIONS.UNKNOWN) {
      // The `10` means the pixels that have to be swiped until we decide if the swipe
      // is horizontal or vertical.
      if (Math.abs(diffX) > 10) {
        dragState.current = {
          ...dragState.current,
          dragDirection: DRAG_DIRECTIONS.HORIZONTAL,
        };
      }

      if (Math.abs(diffY) > 10) {
        dragState.current = {
          ...dragState.current,
          dragDirection: DRAG_DIRECTIONS.VERTICAL,
        };
      }
    }

    // If the swipe direction is vertical, prevent swiping left / right.
    // This is to ensure that the scrolling behavior feels natural
    // and is not interrupted by accidental horizontal micro-movements.
    if (
      dragState.current.dragDirection === DRAG_DIRECTIONS.HORIZONTAL &&
      ((diffX > 0 && activeItemIndex > 0) || (diffX < 0 && activeItemIndex + 1 < items.length))
    ) {
      e.preventDefault();

      const xAdjustment = getXAdjustment({
        index: activeItemIndex,
        count: items.length,
        isLgDown,
      });

      setStyleProps({
        transform: `translateX(-${activeItemIndex * (100 / items.length)}%) translateX(${diffX +
          xAdjustment}px)`,
        // We want to change the position as the user swipes.
        // Animating it would cause an unnatural delay between the
        // user swipe and the item actually moving.
        immediate: true,
      });

      // full container width / number of items
      const ITEM_WIDTH = (viewRef.current?.getBoundingClientRect().width || 0) / items.length;

      // used to always keep the opacity between 0.5 and 1
      // if the number is between 0.5 and 1, it returns the number
      // if the number is below 0.5, it returns 0.5
      // if the number is above 1, it returns one
      const clamp = (number: number) => Math.min(Math.max(0.5, number), 1);

      // we animate the opacity of the carousel items
      // the more the item is to the "center of the screen", the higher
      // the opacity. And vice versa.
      setItemStyleProps((index: number) => {
        // how many items are there between this item and the
        // active item
        const itemIndexDistance = activeItemIndex - index;

        // how far away this item is from the active item
        // in terms of pixels (adjusted for the distance user has swiped)
        const itemDistance = Math.abs(diffX - itemIndexDistance * ITEM_WIDTH);

        // interpolate the opacity based on the `itemDistance`
        const opacity = clamp(0.5 + (1 - itemDistance / ITEM_WIDTH) / 2);

        return {
          opacity,
          // We want the change the opacity as the user swipes.
          // Animating it would cause a delay and would look unnatural.
          immediate: true,
        };
      });

      dragState.current = { ...dragState.current, diffX };
    }
  };

  // User stops swiping. (Releases her finger from the touchscreen.)
  const onTouchEnd = (e: TouchEvent) => {
    e.stopPropagation();

    if (dragState.current.dragDirection === DRAG_DIRECTIONS.HORIZONTAL) {
      // If the user swiped more than 20% of the screen width to the right,
      // we consider it as an intention to move to the previous item.
      if (dragState.current.diffX > 0.2 * window.innerWidth) {
        decrementActiveItem();
      }
      // If the user swiped more than 20% of the screen width to the left,
      // we consider it as an intention to move to the next item.
      else if (dragState.current.diffX < -0.2 * window.innerWidth) {
        incrementActiveItem();
      } else {
        // If the user swiped under 20% of the screen width,
        // we don't consider it as an intention to move to the previous/next
        // item and we animate the carousel back to the active item.
        const xAdjustment = getXAdjustment({
          index: activeItemIndex,
          count: items.length,
          isLgDown,
        });

        setStyleProps({
          transform: `translateX(-${activeItemIndex *
            (100 / items.length)}%) translateX(${xAdjustment}px)`,
          immediate: false,
        });
      }
    }

    // We reset the `dragState` once user finished swiping
    dragState.current = {
      ...dragState.current,
      diffX: 0,
      dragDirection: DRAG_DIRECTIONS.UNKNOWN,
    };
  };

  useEffect(() => {
    viewRef.current?.addEventListener('touchstart', onTouchStart, {
      passive: false,
    });

    viewRef.current?.addEventListener('touchmove', onTouchMove, {
      passive: false,
    });

    viewRef.current?.addEventListener('touchend', onTouchEnd, {
      passive: false,
    });

    return () => {
      viewRef.current?.removeEventListener('touchstart', onTouchStart, {
        passive: false,
      });

      viewRef.current?.removeEventListener('touchmove', onTouchMove, {
        passive: false,
      });

      viewRef.current?.removeEventListener('touchend', onTouchEnd, {
        passive: false,
      });
    };
  }, [activeItemIndex]);

  return (
    <>
      <Container>
        <animated.div style={styleProps} ref={viewRef}>
          <Flex>
            {items.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <CarouselItem key={index} style={itemStyleProps[index]}>
                {item}
              </CarouselItem>
            ))}
          </Flex>
        </animated.div>
        <CarouselArrowContainer
          activeItemIndex={activeItemIndex}
          onClick={() => {
            if (activeItemIndex > 0) {
              decrementActiveItem();
            }
          }}
          itemsCount={items.length}
          left
        >
          {leftArrow}
        </CarouselArrowContainer>
        <CarouselArrowContainer
          activeItemIndex={activeItemIndex}
          onClick={() => {
            if (activeItemIndex + 1 < items.length) {
              incrementActiveItem();
            }
          }}
          itemsCount={items.length}
          right
        >
          {rightArrow}
        </CarouselArrowContainer>
      </Container>
    </>
  );
}

export { CarouselItem, CarouselArrowContainer };
export default Carousel;
