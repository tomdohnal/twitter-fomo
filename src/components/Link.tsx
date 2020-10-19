import React from 'react';
import { Link as ChakraUILink } from '@chakra-ui/core';
import NextJSLink from 'next/link';

const Link: React.FC<{ href: string }> = ({ href, children, ...props }) => {
  return (
    <NextJSLink href={href}>
      <ChakraUILink position="relative" {...props}>
        {children}
      </ChakraUILink>
    </NextJSLink>
  );
};

export default Link;
