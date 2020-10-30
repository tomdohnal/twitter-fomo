import { useToast, useBreakpointValue } from '@chakra-ui/core';
import logger from './logger';

export function useCreateSubscriber() {
  const toast = useToast();
  const isLgDown = useBreakpointValue({ base: true, lg: false });

  return async (email: string) => {
    // validate email
    if (!email) {
      toast({
        title: 'Please enter you email',
        status: 'error',
        isClosable: true,
        position: isLgDown ? 'top' : 'bottom',
      });

      return false;
    }

    // false negatives don't hurt as much as false positives caused by a non-exhaustive regex :)
    if (!email.includes('@')) {
      toast({
        title: 'Please enter a valid email',
        status: 'error',
        isClosable: true,
        position: isLgDown ? 'top' : 'bottom',
      });

      return false;
    }

    try {
      await fetch(`/api/create-subscriber?email=${encodeURIComponent(email)}`);

      localStorage.setItem('IS_SUBSCRIBED', 'true');

      toast({
        title: 'Please check your inbox! 📧',
        description: `I've sent you a confirmation email. I know it's annoying but please do check the inbox now 🙏. Cheers, Tom!`,
        status: 'success',
        isClosable: true,
        duration: 20000,
        position: isLgDown ? 'top' : 'bottom',
      });

      return true;
    } catch (err) {
      toast({
        title: 'Unexpected error ocurred 😖😡😾',
        description:
          "Something has gone wrong and I don't know what 😕. Please DM me (@tom_dohnal) on Twitter. Thanks!",
        status: 'error',
        isClosable: true,
        position: isLgDown ? 'top' : 'bottom',
      });

      logger.error(err);

      return false;
    }
  };
}
