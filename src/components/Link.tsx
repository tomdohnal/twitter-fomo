import React from 'react';
import { Link as ChakraUILink } from '@chakra-ui/core';
import NextJSLink from 'next/link';

const Link: React.FC<{ href: string }> = ({ href, children, ...props }) => {
  // TODO: add nice hover style
  return (
    <NextJSLink href={href}>
      <ChakraUILink {...props}>{children}</ChakraUILink>
    </NextJSLink>
  );
};

export default Link;
