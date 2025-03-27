import { VStack, Box, Image, Progress, HStack, Center, FormControl, FormLabel, Input, Avatar } from '@chakra-ui/react';
import {
  PrimaryText,
  SecondaryText,
  PrimaryButton,
  SecondaryButton,
  FoodDrawer,
  AchievementDrawer,
  LockedDrawer,
} from '@/components';
import { Cloud } from 'react-icon-cloud';
import { useEffect, useRef, useState } from 'react';
import { foodDetails, achievementDetails } from '@/data';
import Camera from '@/assets/svgs/camera.svg?react';
import { whiteLogo } from '@/assets';
import { you, auth } from '@/apis';
import { InfoIcon, WarningIcon } from '@chakra-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { UPDATE } from '../reducers/authSlice';

const cloudProps = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '20vh',
    },
  },
  options: {
    clickToFront: 500,
    depth: 1,
    imageScale: 1,
    initial: [0.03, 0.03],
    outlineColour: '#0000',
    reverse: true,
    tooltip: 'native',
    tooltipDelay: 0,
    wheelZoom: false,
  },
};

const You = () => {
  const [openFoodDrawer, setOpenFoodDrawer] = useState(false);
  const [openAchievementDrawer, setOpenAchievementDrawer] = useState(false);
  const [openFoodLockedDrawer, setOpenFoodLockedDrawer] = useState(false);
  const [openAchievementLockedDrawer, setOpenAchievementLockedDrawer] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState({});

  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const achievementTypeRef = useRef(null);

  const foodClassRef = useRef(null);

  const { loading, error, getYou } = you.useYou();
  const { loading: loadingLogout, logout } = auth.useLogout();
  const { loading: loadingUpdateYou, updateYou } = you.useUpdateYou();

  const dispatch = useDispatch();

  function handleAvatarChange(e) {
    if (e.target.files) {
      setProfile(e.target.files[0]);
    }
  }

  const notifyError = (msg) => {
    toast(
      <HStack minHeight={'50px'} gap={2} width={'100%'} mx={2}>
        <WarningIcon color={'secondary.1'} />
        <SecondaryText fontSize='md'> {msg}</SecondaryText>
      </HStack>,
      {
        position: 'top-center',
        overflow: 'hidden',
      },
    );
  };

  const notifySuccess = (msg) => {
    toast(
      <HStack minHeight={'50px'} gap={2} width={'100%'} mx={2}>
        <InfoIcon color='primary.4' />
        <SecondaryText fontSize='md'> {msg}</SecondaryText>
      </HStack>,
      {
        position: 'top-center',
        overflow: 'hidden',
      },
    );
  };
  const dateReformat = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  const handleUpdate = () => {
    updateYou(notifyError, notifySuccess, name, newPassword, oldPassword, profile);
  };

  useEffect(() => {
    const f = async () => {
      const data = await getYou();
      setUserData(data);
      dispatch(UPDATE(data));
    };
    f();
  }, []);

  return (
    <>
      <ToastContainer />
      {editProfile ? (
        <>
          <VStack w='100vw' gap='0' overflowX='hidden'>
            <Box w='100%' bg='secondary.1' zIndex={-2} borderBottomRadius={'30px'}>
              {
              
                userData && 
                <Cloud {...cloudProps}>
                  {
                      foodDetails.filter(i => userData.food[i.id] !== null).map((i) => (
                    <a onClick={(e) => e.preventDefault()} href={undefined} target={undefined} rel={undefined}>
                      <img height='100px' width='100px' src={i.src} />
                    </a>
                  ))}
                    <a onClick={(e) => e.preventDefault()} href={undefined} target={undefined} rel={undefined}>
                    {' '}
                    </a>
                </Cloud>
              }
            </Box>
            <VStack w='100%' zIndex={1} bg='white' position='relative' minH='70vh' pb='80px'>
              <VStack maxW={{ base: 'xs', md: 'md' }} w='100%'>
                <VStack>
                  <Avatar
                    src={profile ? URL.createObjectURL(profile) : userData.image}
                    position='absolute'
                    top='-70px'
                    bg='primary.3'
                    width='130px'
                    height='130px'
                  />
                  <Center
                    position='absolute'
                    top='-70px'
                    width='130px'
                    height='130px'
                    bg='#00000099'
                    borderRadius='100%'
                    _hover={{
                      cursor: 'pointer',
                    }}
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <Camera fill='white' width='30px' height='30px' />
                  </Center>
                  <input id='fileInput' type='file' accept='image/*' hidden onChange={handleAvatarChange} />
                </VStack>
                <FormControl as='form' onSubmit={(e) => e.preventDefault()} mt='40px'>
                  <FormLabel pt={4} fontWeight={700}>
                    Name
                  </FormLabel>
                  <Input
                    id='name'
                    type='text'
                    bg='primary.2'
                    focusBorderColor='primary.4'
                    placeholder={userData.name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />

                  <FormLabel pt={4} fontWeight={700}>
                    Email
                  </FormLabel>
                  <SecondaryText>{userData.email}</SecondaryText>

                  <FormLabel pt={4} fontWeight={700}>
                    Old Password
                  </FormLabel>
                  <Input
                    id='pwd'
                    type='password'
                    bg='primary.2'
                    focusBorderColor='primary.4'
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                    value={oldPassword}
                  />

                  <FormLabel pt={4} fontWeight={700}>
                    New Password
                  </FormLabel>
                  <Input
                    id='confirm_pwd'
                    type='password'
                    bg='primary.2'
                    focusBorderColor='primary.4'
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    value={newPassword}
                  />

                  <PrimaryButton
                    isLoading={loadingUpdateYou}
                    loadingText='Submitting'
                    mt={10}
                    w='100%'
                    type='submit'
                    onClick={handleUpdate}
                  >
                    Done
                  </PrimaryButton>
                </FormControl>
                <SecondaryButton w='100%' onClick={() => setEditProfile(false)}>
                  Back
                </SecondaryButton>
              </VStack>
            </VStack>
          </VStack>
        </>
      ) : (
        <>
          {loading ? (
            <></>
          ) : (
            <>
              <VStack w='100vw' gap='0' overflowX='hidden'>
                <Box w='100%' bg='secondary.1' zIndex={-2} borderBottomRadius={'30px'}>
                  {
                    userData &&
                    <Cloud {...cloudProps}>
                  {
                      foodDetails.filter(i => userData.food[i.id] !== null).map((i) => (
                    <a onClick={(e) => e.preventDefault()} href={undefined} target={undefined} rel={undefined}>
                      <img height='100px' width='100px' src={i.src} />
                    </a>
                  ))}
                    <a onClick={(e) => e.preventDefault()} href={undefined} target={undefined} rel={undefined}>
                    {' '}
                    </a>
                    </Cloud>
                  }
                </Box>

                <VStack w='100%' zIndex={1} bg='white' position='relative' minH='70vh' pb='80px'>
                  <VStack maxW={{ base: 'xs', md: 'md' }} w='100%' gap='40px'>
                    <VStack>
                      <Avatar
                        src={userData.image}
                        bg='primary.3'
                        borderRadius={'100%'}
                        objectFit={'cover'}
                        position='absolute'
                        top='-70px'
                        width={'130px'}
                        height={'130px'}
                      />
                      <PrimaryText fontSize='lg' mt='70px'>
                        {userData.name}
                      </PrimaryText>
                    </VStack>
                    <VStack w='100%' gap='10px'>
                      <HStack justifyContent={'space-between'} w='100%'>
                        <SecondaryText fontWeight='bold'> Foods Unlocked </SecondaryText>
                        <SecondaryText fontWeight='bold'> {`${userData.totalUnlocked} / 30`} </SecondaryText>
                      </HStack>
                      <Progress
                        value={(userData.totalUnlocked / 30) * 100}
                        width='100%'
                        height='10px'
                        borderRadius={'10px'}
                      />
                    </VStack>

                    <VStack w='100%' gap='10px'>
                      <SecondaryText width={'100%'} fontWeight={'bold'} fontSize='md'>
                        Foods
                      </SecondaryText>
                      <HStack
                        maxW='100%'
                        overflowX='auto'
                        p='10px'
                        gap='30px'
                        sx={{
                          '&::-webkit-scrollbar': {
                            height: '5px',
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
                        {foodDetails.map((i) => (
                          <Image
                            className={userData.food[i.id] !== null ? null : 'locked'}
                            src={i.src}
                            borderRadius='10px'
                            width='70px'
                            onClick={() => {
                              foodClassRef.current = i;
                              if (userData.food[i.id]) {
                                setOpenFoodDrawer(true);
                                setOpenFoodLockedDrawer(false);
                              } else {
                                setOpenFoodDrawer(false);
                                setOpenFoodLockedDrawer(true);
                              }
                            }}
                            p='5px'
                            transition='all 0.2s'
                            _hover={{
                              bg: 'primary.2',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </HStack>
                    </VStack>
                    <VStack w='100%' gap='10px'>
                      <SecondaryText width={'100%'} fontWeight={'bold'} fontSize='md'>
                        Achievements
                      </SecondaryText>
                      <HStack
                        maxW='md'
                        overflowX='auto'
                        p='10px'
                        gap='30px'
                        sx={{
                          '&::-webkit-scrollbar': {
                            height: '5px',
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
                        {achievementDetails.map((i) => (
                          <Image
                            className={userData.achievement[i.id] !== null ? null : 'locked'}
                            src={i.src}
                            borderRadius='10px'
                            width='70px'
                            onClick={() => {
                              if (userData.achievement[i.id]) {
                                setOpenAchievementDrawer(true);
                                setOpenAchievementLockedDrawer(false);
                              } else {
                                setOpenAchievementDrawer(false);
                                setOpenAchievementLockedDrawer(true);
                              }
                              achievementTypeRef.current = i;
                            }}
                            p='5px'
                            transition='all 0.2s'
                            _hover={{
                              bg: 'primary.2',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </HStack>
                    </VStack>
                    <VStack w='100%' gap='10px'>
                      <PrimaryButton w='100%' onClick={() => setEditProfile(true)}>
                        Edit Profile
                      </PrimaryButton>
                      <SecondaryButton w='100%' onClick={() => logout()}>
                        Log Out
                      </SecondaryButton>
                    </VStack>
                  </VStack>
                </VStack>
              </VStack>
              <LockedDrawer
                type='food'
                item={foodClassRef.current}
                open={openFoodLockedDrawer}
                setOpen={setOpenFoodLockedDrawer}
                onClose={() => {
                  setOpenFoodLockedDrawer(false);
                }}
                onClick={() => {
                  setOpenFoodLockedDrawer(false);
                }}
              />
              <LockedDrawer
                type='achievement'
                item={achievementTypeRef.current}
                open={openAchievementLockedDrawer}
                setOpen={setOpenAchievementLockedDrawer}
                onClose={() => {
                  setOpenAchievementLockedDrawer(false);
                }}
                onClick={() => {
                  setOpenAchievementLockedDrawer(false);
                }}
              />
              <FoodDrawer
                food={foodClassRef.current}
                found={false}
                date={foodClassRef.current ? dateReformat(userData.food[foodClassRef.current.id]) : ''}
                open={openFoodDrawer}
                setOpen={setOpenFoodDrawer}
                onClose={() => {
                  setOpenFoodDrawer(false);
                }}
                onClick={() => {
                  setOpenFoodDrawer(false);
                }}
              />
              <AchievementDrawer
                achievement={achievementTypeRef.current}
                date={achievementTypeRef.current ? dateReformat(userData.achievement[achievementTypeRef.current.id]) : ''}
                open={openAchievementDrawer}
                setOpen={setOpenAchievementDrawer}
                onClose={() => {
                  setOpenAchievementDrawer(false);
                }}
                onClick={() => {
                  setOpenAchievementDrawer(false);
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default You;
