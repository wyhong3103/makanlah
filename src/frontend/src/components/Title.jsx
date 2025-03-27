import { HStack, Heading, Image } from '@chakra-ui/react';
import { whiteLogo } from '../assets';

const Title = () => {
  return (
    <HStack
      bg='secondary.1'
      padding={5}
      height={{ base: '9vh', md: '13vh' }}
      width='100%'
      position='fixed'
      borderBottomRadius={'20px'}
      zIndex={10}
      top={0}
      alignItems='center'
    >
      <Image width='50px' src={whiteLogo} alt='logo' />
      <Heading color='primary.1' fontSize='xl' position='relative'>
        MakanLah
      </Heading>
    </HStack>
  );
};

export default Title;
