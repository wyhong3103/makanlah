import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading: `'Universo Black',  sans-serif`,
  body: `'URW Geometric',  sans-serif`,
};

const theme = extendTheme({
  fonts,
  colors: {
    primary: {
      1: '#fafafa',
      2: '#E5E5E5',
      3: '#D4D4D4',
      4: '#a1a1a1',
    },
    secondary: {
      1: '#FB2C36',
      2: '#FF6467',
      3: '#FFA2A2',
      default: '#FB2C36',
    },
    neutral: {
      1: '#18181B',
    },
  },
  components: {
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: '#FB2C36',
        },
      },
    },
  },
});

export default theme;
