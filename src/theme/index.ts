import { extendTheme } from '@chakra-ui/core';
import foundations from './foundations';
import components from './components';
import styles from './styles';

const themeExtension = {
  ...foundations,
  components,
  styles,
};

const theme = extendTheme(themeExtension);

export default theme;
