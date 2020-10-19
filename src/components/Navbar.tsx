import React, { useEffect, useState, memo, useCallback, useRef } from 'react';
import { Stack, useTheme, Box, useBreakpointValue } from '@chakra-ui/core';
import { animated, useSpring, config } from 'react-spring';
import { useLayoutEffect } from 'react-layout-effect';
import throttle from 'lodash.throttle';
import Container from './Container';
import Link from './Link';
import { useActiveId, useIsHovered, useScrollInfo, SCROLL_DIRECTIONS } from '../utils';

const AnimatedLink = animated(Link);
const AnimatedBox = animated(Box);

const NavbarLink: React.FC<{ isActive: boolean; to: string }> = ({ children, to, isActive }) => {
  const theme = useTheme();
  const [isHovered, listeners] = useIsHovered();
  const animatedValues = useSpring({
    color: isActive || isHovered ? theme.colors.text : theme.colors.gray['400'],
    config: config.gentle,
  });
  const scrollSectionRef = useRef<Element | null>(null);
  useEffect(() => {
    scrollSectionRef.current = document.getElementById(to);
  }, [to]);

  return (
    <AnimatedLink
      fontWeight={700}
      textTransform="lowercase"
      fontSize="lg"
      href={`/#${to}`}
      onClick={(e: Event) => {
        e.preventDefault();

        // eslint-disable-next-line no-unused-expressions
        scrollSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }}
      style={animatedValues}
      {...listeners}
    >
      {children}
    </AnimatedLink>
  );
};

const SECTIONS = [
  {
    id: 'home',
    title: 'Home',
  },
  {
    id: 'problem',
    title: 'The problem',
  },
  {
    id: 'solution',
    title: 'This solution',
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
  },
  {
    id: 'faq',
    title: 'FAQ',
  },
  {
    id: 'about',
    title: 'About us',
  },
];

const NAVBAR_STATES = {
  INITIAL: 'INITIAL',
  HIDDEN: 'HIDDEN',
  STUCK: 'STUCK',
};

export const NAVBAR_HEIGHTS = {
  DESKTOP: 72,
  MOBILE: 60,
};

const getNavbarAnimationStyles = ({
  state,
  isMdDown,
}: {
  state: typeof NAVBAR_STATES[keyof typeof NAVBAR_STATES];
  isMdDown: boolean;
}) => {
  switch (state) {
    case NAVBAR_STATES.INITIAL:
      if (isMdDown) {
        return {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0)',
        };
      }

      return {
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0)',
      };
    case NAVBAR_STATES.STUCK:
      if (isMdDown) {
        return {
          top: '0px',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
        };
      }

      return {
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
      };
    case NAVBAR_STATES.HIDDEN:
      return {
        top: '-60px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
      };

    default:
      return {};
  }
};

const Navbar: React.FC = memo(function Navbar() {
  const activeSectionId = useActiveId(SECTIONS.map(section => section.id));
  const [navbarState, setNavbarState] = useState(NAVBAR_STATES.INITIAL);
  const isMdDown = useBreakpointValue({ base: true, md: false });
  const { scrollDirection } = useScrollInfo();
  const animatedValues = useSpring({
    ...getNavbarAnimationStyles({ state: navbarState, isMdDown: Boolean(isMdDown) }),
    config: { ...config.gentle, clamp: true },
  });

  useEffect(() => {
    const onScroll = throttle(() => {
      const { scrollY } = window;

      // on desktops, set the navbar as "stuck" whenever the user scrolls the
      // page down
      if (!isMdDown) {
        setNavbarState(scrollY > 1 ? NAVBAR_STATES.STUCK : NAVBAR_STATES.INITIAL);
        return;
      }

      // if the user scrolls DOWN, the mobile navbar is NOT set as `HIDDEN`, and
      // the user scroll past the height of the navbar
      if (scrollDirection === SCROLL_DIRECTIONS.DOWN && navbarState !== NAVBAR_STATES.HIDDEN) {
        setNavbarState(NAVBAR_STATES.HIDDEN);
      }

      // if the user scrolls UP
      if (scrollDirection === SCROLL_DIRECTIONS.UP) {
        // if the user scroll to the very top of the page
        if (scrollY <= 1 && navbarState !== NAVBAR_STATES.INITIAL) {
          setNavbarState(NAVBAR_STATES.INITIAL);
        }

        // if the user scrolled UP and is below the navbar height
        else if (scrollY > NAVBAR_HEIGHTS.MOBILE) {
          setNavbarState(NAVBAR_STATES.STUCK);
        }
      }
    }, 100);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [isMdDown, navbarState, scrollDirection]);

  return (
    <AnimatedBox
      background="#fff"
      pos="sticky"
      top={0}
      height={{ base: NAVBAR_HEIGHTS.MOBILE, md: NAVBAR_HEIGHTS.DESKTOP }}
      style={animatedValues}
      zIndex={2}
    >
      <Container display="flex" alignItems="center" height="100%">
        <Stack display={{ base: 'none', md: 'flex' }} direction="row" spacing={6}>
          {SECTIONS.map(section => (
            <NavbarLink key={section.id} to={section.id} isActive={section.id === activeSectionId}>
              {section.title}
            </NavbarLink>
          ))}
        </Stack>
        <Link
          display={{ md: 'none' }}
          href="/#home"
          fontWeight={800}
          fontSize="lg"
          color="primaryPalette.700"
          p={2}
          border="2px solid"
          borderColor="primaryPalette.700"
        >
          TwitterFOMO
        </Link>
        <Link
          href="/leaderboard"
          color="primary"
          fontWeight={800}
          ml="auto"
          textTransform="lowercase"
          fontSize="lg"
          transition="color .2s ease-in-out"
          _hover={{ color: 'primaryPalette.800' }}
        >
          Go to app
        </Link>
      </Container>
    </AnimatedBox>
  );
});

export default Navbar;
