import { Heading, Image, VStack, Text, Slide, Spinner, Center } from '@chakra-ui/react';
import { whiteLogo } from '@/assets';
import { PrimaryButton, SecondaryButton, SecondaryText } from '@/components';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { auth } from '@/apis';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { loading, error, success } = auth.useVerifyEmail(token);

  return (
    <>
      <VStack
        bg='secondary.1'
        h='100vh'
        pt={{ base: '50px', md: '20px' }}
        pb='50px'
        gap='0'
        alignItems='center'
        position='fixed'
        w='100%'
      >
        <Image src={whiteLogo} alt='logo' width='90px' />
        <Heading color='#FFFFFF' fontSize='3xl'>
          MakanLah
        </Heading>
      </VStack>
      <Slide direction='bottom' in={true} style={{ zIndex: 10 }}>
        <VStack
          bg='primary.1'
          h={{ base: '60vh', md: '70vh' }}
          px={20}
          py={5}
          position='relative'
          borderTopRadius='30px'
          overflowY='auto'
          overflowX='hidden'
          sx={{
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `primary.3`,
              borderRadius: '8px',
            },
            '&::-webkit-scrollbar-track': {
              marginTop: '30px',
            },
          }}
        >
          <VStack w={{ base: 'xs', md: 'sm' }} h='100%'>
            {loading && <Spinner />}
            {!loading && error ? (
              <VStack h='100%' justifyContent={'center'} w='100%'>
                <WarningIcon boxSize={20} color='secondary.1' />
                <Heading fontSize='lg'>Something went wrong!</Heading>
                <SecondaryText mt='20px' textAlign='justify'>
                  {error}
                </SecondaryText>
                <PrimaryButton mt='20px' w='100%' onClick={() => navigate('/auth')}>
                  <Text position='relative' top='2px'>
                    Back
                  </Text>
                </PrimaryButton>
              </VStack>
            ) : (
              <VStack h='100%' justifyContent={'center'} w='100%'>
                <CheckCircleIcon boxSize={20} color='secondary.1' />
                <Heading fontSize='lg'>Email Verified Successfully!</Heading>
                <SecondaryText mt='20px' textAlign='justify'>
                  Your email has been successfully verified. You're all set—let's get started!{' '}
                </SecondaryText>
                <PrimaryButton mt='20px' w='100%' onClick={() => navigate('/auth')}>
                  <Text position='relative' top='2px'>
                    Login Now
                  </Text>
                </PrimaryButton>
              </VStack>
            )}
          </VStack>
        </VStack>
      </Slide>
    </>
  );
};

export default VerifyEmail;
