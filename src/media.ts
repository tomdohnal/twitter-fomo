import { createMedia } from '@artsy/fresnel';
import theme from './theme';

const ExampleAppMedia = createMedia({
  breakpoints: {
    base: parseInt(theme.breakpoints.base, 10),
    sm: parseInt(theme.breakpoints.sm, 10),
    md: parseInt(theme.breakpoints.md, 10),
    lg: parseInt(theme.breakpoints.lg, 10),
    xl: parseInt(theme.breakpoints.xl, 10),
  },
});

// Generate CSS to be injected into the head
export const mediaStyle = ExampleAppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = ExampleAppMedia;
