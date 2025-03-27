import {
  Box,
  FormControl,
  Heading,
  Image,
  VStack,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  Center,
  Button,
  Divider,
  AbsoluteCenter,
  HStack,
  Slide,
  Collapse,
  useDisclosure,
  Link,
  Avatar,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { whiteLogo, googleLogo } from '@/assets';
import { PrimaryButton, SecondaryButton, SecondaryText } from '@/components';
import { EmailIcon, WarningIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import Camera from '@/assets/svgs/camera.svg?react';
import { auth } from '@/apis';
import { ToastContainer, toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';

const Auth = () => {
  const { isOpen: LoginOpen, SignUpOpen } = useDisclosure();
  const [page, setPage] = useState('landing');
  const { loading: loginLoading, login } = auth.useLogin();
  const { loading: registerLoading, register } = auth.useRegister();
  const { loading: verificationEmailLoading, sendVerificationEmail } = auth.useSendVerificationEmail();
  const { loading: googleLoginLoading, loginWithGoogle } = auth.useLoginWithGoogle();
  const { loading: emailExistLoading, getEmailExist } = auth.useEmailExist();

  const [profile, setProfile] = useState(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerPw, setRegisterPw] = useState('');
  const [registerPw1, setRegisterPw1] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  const [ seconds, setSeconds ] = useState(0);

  const googleLogin = useGoogleLogin({
    onSuccess: ({ code }) => loginWithGoogle(notifyError, code),
    flow: 'auth-code',
  });

  const loginPage = () => setPage('login');
  const signUpPage = () => setPage('signUp');
  const landingPage = () => setPage('landing');
  const verifyPage = () => setPage('verify');

  const notifyError = (msg) => {
    toast(
      <HStack minHeight={'50px'} gap={2} width={'100%'} mx={2}>
        <WarningIcon color={'secondary.1'} />
        <SecondaryText fontSize='md'> {msg} !</SecondaryText>
      </HStack>,
      {
        position: 'top-center',
        overflow: 'hidden',
      },
    );
  };

  const handleLoginContinue = async () => {
    const emailExist = await getEmailExist(notifyError, loginEmail);
    if (emailExist.result) {
      loginPage();
    } else {
      notifyError('Email does not exist!');
    }
  };

  function handleAvatarChange(e) {
    if (e.target.files) {
      setProfile(e.target.files[0]);
    }
  }

  const handleLogin = () => {
    login(verifyPage, notifyError, loginEmail, loginPassword);
  };

  const handleRegister = () => {
    if (registerPw !== registerPw1) {
      notifyError('Password do not match!');
    } else {
      register(verifyPage, notifyError, registerName, registerEmail, registerPw, profile);
    }
  };

  const startTimer = () => {
    setSeconds(30);
  }

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]); 

  useEffect(() => {
    if (page === 'verify') {
      startTimer();
      sendVerificationEmail(notifyError);
    }
  }, [page]);

  return (
    <>
      <ToastContainer />
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
      <Slide direction='bottom' in={page === 'landing'} style={{ zIndex: 10 }}>
        <VStack bg='primary.1' h={{ base: '60vh', md: '70vh' }} px={20} py={5} position='relative' borderTopRadius='30px'>
          <VStack w={{ base: 'xs', md: 'sm' }}>
            <Heading fontSize='lg' mb={5} w='100%'>
              Ready to start off?
            </Heading>
            <FormControl
              as={'form'}
              onSubmit={(e) => {
                e.preventDefault();
                handleLoginContinue();
              }}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                bg='primary.2'
                required
                focusBorderColor='primary.4'
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <PrimaryButton mt={'30px'} w='100%' type='submit'>
                Continue
              </PrimaryButton>
            </FormControl>
            <Box position='relative' py={5} w='100%'>
              <Divider orientation='horizontal' borderColor='neutral.1' />
              <AbsoluteCenter bg='primary.1' px='4'>
                or
              </AbsoluteCenter>
            </Box>
            <SecondaryButton w='100%' onClick={googleLogin}>
              <HStack gap='20px' justifyContent='center' alignItems='center'>
                <Image src={googleLogo} alt='logo' width='25px' />
                <Text position='relative' top='2px'>
                  Continue with Google
                </Text>
              </HStack>
            </SecondaryButton>
            <Text color='primary.4' fontSize='sm'>
              Doesn't have an account yet?{' '}
              <Link fontWeight={'bold'} onClick={signUpPage}>
                {' '}
                Sign Up Here
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Slide>
      <Slide direction='bottom' in={page === 'login'} style={{ zIndex: 10 }}>
        <VStack bg='primary.1' h={{ base: '60vh', md: '70vh' }} px={20} py={5} position='relative' borderTopRadius='30px'>
          <VStack w={{ base: 'xs', md: 'sm' }}>
            <Heading fontSize='lg' mb={5} w='100%'>
              Good to see you again!
            </Heading>
            <FormControl as={'form'} onSubmit={handleLogin}>
              <FormLabel>Password</FormLabel>
              <Box display='block'>
                <Input
                  type='password'
                  bg='primary.2'
                  focusBorderColor='primary.4'
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <PrimaryButton
                  isLoading={loginLoading}
                  loadingText={'Submitting'}
                  mt={'30px'}
                  w='100%'
                  type='submit'
                  onClick={handleLogin}
                >
                  Login
                </PrimaryButton>
              </Box>
            </FormControl>
            <SecondaryButton w='100%' onClick={landingPage}>
              <Text position='relative' top='2px'>
                Back
              </Text>
            </SecondaryButton>
          </VStack>
        </VStack>
      </Slide>
      <Slide direction='bottom' in={page === 'signUp'} style={{ zIndex: 10 }}>
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
          <VStack w={{ base: 'xs', md: 'sm' }}>
            <Heading fontSize='lg' mb={5} w='100%'>
              Let's get you started!
            </Heading>
            <FormControl
              as='form'
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <FormLabel>Avatar</FormLabel>
              <Center>
                <Box position='relative'>
                  <Avatar
                    size='lg'
                    src={profile ? URL.createObjectURL(profile) : Avatar}
                    bg='primary.3'
                    cursor='pointer'
                    border-radius='100%'
                    width='60px'
                    height='60px'
                    object-fit='cover'
                  />
                  <Center
                    position='absolute'
                    top='0'
                    width='60px'
                    height='60px'
                    bg='#00000099'
                    borderRadius='100%'
                    _hover={{
                      cursor: 'pointer',
                    }}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <Camera fill='white' width='20px' height='20px' />
                  </Center>
                </Box>
                <input id='fileInput' type='file' accept='image/*' hidden onChange={handleAvatarChange} />
              </Center>

              <FormLabel pt={4}>Name</FormLabel>
              <Input
                id='name'
                type='text'
                bg='primary.2'
                focusBorderColor='primary.4'
                required
                value={registerName}
                onChange={(e) => {
                  setRegisterName(e.target.value);
                }}
              />

              <FormLabel pt={4}>Email</FormLabel>
              <Input
                bg='primary.2'
                focusBorderColor='primary.4'
                required
                value={registerEmail}
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
              />

              <FormLabel pt={4}>Password</FormLabel>
              <Input
                id='pwd'
                type='password'
                bg='primary.2'
                focusBorderColor='primary.4'
                required
                value={registerPw}
                onChange={(e) => {
                  setRegisterPw(e.target.value);
                }}
              />
              <FormHelperText color={'primary.4'} fontSize={'xs'}>
                Password must be at least 8 characters, with at least one letter and one digit character.
              </FormHelperText>

              <FormLabel pt={4}>Confirm Password</FormLabel>
              <Input
                id='confirm_pwd'
                type='password'
                bg='primary.2'
                focusBorderColor='primary.4'
                required
                value={registerPw1}
                onChange={(e) => {
                  setRegisterPw1(e.target.value);
                }}
              />

              <PrimaryButton
                isLoading={registerLoading}
                loadingText='Submitting'
                mt={'30px'}
                w='100%'
                type='submit'
                onClick={handleRegister}
              >
                Register
              </PrimaryButton>
            </FormControl>

            <SecondaryButton w='100%' onClick={landingPage}>
              <Text position='relative' top='2px'>
                Back
              </Text>
            </SecondaryButton>
          </VStack>
        </VStack>
      </Slide>
      <Slide direction='bottom' in={page === 'verify'} style={{ zIndex: 10 }}>
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
            <VStack h='100%' justifyContent={'center'} w='100%'>
              <EmailIcon boxSize={20} color='secondary.1' />
              <Heading fontSize='lg'>Check your inbox, please!</Heading>
              <SecondaryText mt='20px' textAlign='justify'>
A verification email has been sent. Please check your <span style={{fontWeight: 'bold'}}>inbox or spam folder</span> and follow the instructions. The link will expire in <span style={{fontWeight: 'bold'}}>10 minutes</span>.


              </SecondaryText>
              <Box w='100%'>
                <PrimaryButton isDisabled={seconds > 0} mt='30px' w='100%' onClick={() => {
                  startTimer();
                  sendVerificationEmail(notifyError)
                }}>
                  <Text position='relative' top='2px'>
                    Send Again {seconds > 0 ? `in ${seconds}` : ""}
                  </Text>
                </PrimaryButton>
                <SecondaryButton mt='10px' w='100%' onClick={landingPage}>
                  <Text position='relative' top='2px'>
                    Back
                  </Text>
                </SecondaryButton>
              </Box>
            </VStack>
          </VStack>
        </VStack>
      </Slide>
    </>
  );
};

export { Auth };
