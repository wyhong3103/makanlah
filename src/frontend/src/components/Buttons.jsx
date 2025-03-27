import { Button } from '@chakra-ui/react';

export const PrimaryButton = ({ children, ...rest }) => {
  return (
    <Button color='primary.1' bg='secondary.1' _hover={{ bg: 'secondary.2' }} _active={{ bg: 'secondary.2'}} {...rest}>
      {children}
    </Button>
  );
};

export const SecondaryButton = ({ children, ...rest }) => {
  return (
    <Button color='secondary.1' bg='primary.1' border='1px' borderColor='secondary.1' _hover={{ bg: 'primary.2' }}  _active={{ bg: 'primary.2' }} {...rest}>
      {children}
    </Button>
  );
};
