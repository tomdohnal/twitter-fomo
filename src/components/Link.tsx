import React from 'react';
import { Link as ChakraUILink, LinkProps } from '@chakra-ui/core';
import NextJSLink from 'next/link';

const Link: React.FC<{ href: string } & LinkProps> = ({ href, children, ...props }) => {
  if (props.isExternal) {
    return (
      <ChakraUILink position="relative" href={href} {...props}>
        {children}
      </ChakraUILink>
    );
  }

  return (
    <NextJSLink href={href}>
      <ChakraUILink position="relative" {...props}>
        {children}
      </ChakraUILink>
    </NextJSLink>
  );
};

export default Link;
