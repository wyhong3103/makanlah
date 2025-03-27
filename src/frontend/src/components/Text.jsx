import { Heading, Text } from '@chakra-ui/react';

export const PrimaryText = ({ children, ...rest }) => {
  return (
    <Heading position={'relative'} bottom='-2px' {...rest}>
      {children}
    </Heading>
  );
};

export const SecondaryText = ({ children, ...rest }) => {
  return (
    <Text position='relative' bottom='-2px' {...rest}>
      {children}
    </Text>
  );
};
