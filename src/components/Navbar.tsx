import { Box, Stack, useBreakpointValue, useTheme } from '@chakra-ui/core';
import throttle from 'lodash.throttle';
import React, { memo, useEffect, useRef, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { LEADERBOARD_LINK } from '../constants';
import { SCROLL_DIRECTIONS, useActiveId, useIsHovered, useScrollInfo } from '../utils';
import Container from './Container';
import Link from './Link';
import * as gtag from '../gtag';

const AnimatedLink = animated(Link);
const AnimatedBox = animated(Box);

const NavbarLink: React.FC<{ isActive: boolean; to: string }> = ({ children, to, isActive }) => {
  const theme = useTheme();
  const [isHovered, listeners] = useIsHovered();
  const animatedValues = useSpring({
    color: isActive || isHovered ? theme.colors.text : theme.colors.gray['400'],
    config: config.gentle,
  });
  const isBelowLg = useBreakpointValue({ base: true, lg: false });
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
        const elementTop = Math.max(
          (scrollSectionRef.current as HTMLElement).offsetTop -
            (isBelowLg ? NAVBAR_HEIGHTS.MOBILE : NAVBAR_HEIGHTS.DESKTOP) -
            16,
          0,
        );

        window.scrollTo({ top: elementTop, behavior: 'smooth' });
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
    title: 'About me',
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
        <Box display={{ md: 'none' }} href="/#home">
          <Box
            boxSize={12}
            as="svg"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="512" height="512" fill="#DA127D" />
            <path
              d="M260 138V195.2H180.4V414H105.2V195.2H25.2V138H260ZM351.313 136.8C365.979 136.8 381.179 136.933 396.913 137.2C412.913 137.2 428.379 137.6 443.313 138.4C458.246 138.933 471.979 140 484.513 141.6L480.913 194.8H382.912C370.113 194.8 363.713 200.533 363.713 212V251.6H466.113V302.4H363.713V414H288.513V196.4C288.513 178.533 294.246 164.133 305.713 153.2C317.446 142.267 332.646 136.8 351.313 136.8Z"
              fill="#FFEEF3"
            />
          </Box>
        </Box>
        <Link
          href={LEADERBOARD_LINK}
          color="primary"
          fontWeight={800}
          ml="auto"
          textTransform="lowercase"
          fontSize="lg"
          transition="color .2s ease-in-out"
          _hover={{ color: 'primaryPalette.800' }}
          isExternal
          onClick={() => {
            gtag.event({
              action: 'view_top_tweets_click',
              category: 'LP',
              label: 'navbar',
            });
          }}
        >
          View top tweets
        </Link>
      </Container>
    </AnimatedBox>
  );
});

export default Navbar;
