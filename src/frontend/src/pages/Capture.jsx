import { useEffect, useState, useRef } from 'react';
import { Camera } from 'react-camera-pro';
import {
  Heading,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Image as ChakraImage,
  Icon,
  Box,
  Text,
  useDisclosure,
  Button,
  Progress,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react';
import { achievement, circleLogo, feedback, focus_square } from '@/assets';
import { RepeatIcon, TriangleDownIcon, SunIcon, WarningIcon, QuestionIcon, InfoIcon } from '@chakra-ui/icons';
import { PrimaryButton, SecondaryButton, PrimaryText, SecondaryText, FoodDrawer, FeedbackModal } from '@/components';
import { foodDetails, achievementDetails } from '@/data';
import { ToastContainer, toast } from 'react-toastify';
import { prediction } from '@/apis';

const CatchError = ({ setError }) => {
  useEffect(() => {
    setError(true);
  }, []);
  return <></>;
};

const Capture = () => {
  const { isOpen: isFeedbackOpen, onOpen: onFeedbackOpen, onClose: onFeedbackClose } = useDisclosure();
  const {loading: predictLoading, predict} = prediction.usePredict();
  const { loading: feedbackLoading, sendFeedback } = prediction.useSendFeedback();
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [takePhoto, setTakePhoto] = useState(true);
  const [error, setError] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const selectedFeedback = useRef('');
  const [toggledTorch, setToggledTorch] = useState(false);
  const [open, setOpen] = useState(false);
  const foodFound = useRef(null);
  const unlockedAchievements = useRef([]);
  const predictionId = useRef('');
  const progress = useRef(0)
  const image = useRef(null)
  const cancelRef = useRef();
  const camera = useRef(null);
  const initialRef = useRef(null);

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

  const notifyFeedback = () => {
    const feedbackToast = toast(
      <VStack height={'80px'} width={'100%'} mx={2} gap={'15px'}>
        <HStack w='100%'>
        <QuestionIcon color='primary.4'/>
        <SecondaryText fontSize='md'>Was the result accurate?</SecondaryText>
        </HStack>
        <HStack width={'100%'} align='center'>
          <Button
            bg={'#00B65B'}
            color={'white'}
            flex={1}
            onClick={() => {
              selectedFeedback.current = 'yes';
              toast.dismiss(feedbackToast);
              handleSubmitFeedback();
            }}
            _hover={{ bg: '#009d4e' }}
            h='35px'
          >
            <SecondaryText fontSize='md'>Yes</SecondaryText>
          </Button>

          <Button
            bg={'secondary.2'}
            color={'white'}
            ref={cancelRef}
            flex={1}
            onClick={() => {
              toast.dismiss();
              selectedFeedback.current = 'no';
              setTimeout(onFeedbackOpen, 500);
            }}
            _hover={{ bg: 'rgb(224, 71, 74)' }}
            h='35px'
          >
            <SecondaryText fontSize='md'>No</SecondaryText>
          </Button>
        </HStack>
      </VStack>,
      {
        position: 'top-center',
        overflow: 'hidden',
      },
    );
  };

  const notifyAchievement = (achievementId) => {
    const currentAchievement = achievementDetails.find(i => i.id === achievementId);
    toast(
      <VStack minHeight={'80px'} gap={2} width={'100%'} mx={2}>
        <HStack w='100%'>
        <InfoIcon color='primary.4'/>
        <VStack w='100%' position='relative'>
        <SecondaryText fontSize='md' textAlign='center'>
          {' '}
          You've unlocked
         <span style={{color:'#FB2C36'}}> {currentAchievement.name} </span>!
        </SecondaryText>
         </VStack>
        </HStack>
        <HStack width={'100%'} justifyContent={'center'}>
          <ChakraImage height={'40px'} src={currentAchievement.src} alt='achievement logo' />
        </HStack>
      </VStack>,
      {
        position: 'top-center',
        overflow: 'hidden'
      },
    );
  };

  const notifyNotFound = () => {
    toast(
      <VStack gap={2} width={'100%'} mx={2}>
        <HStack w='100%'>
        <InfoIcon color='secondary.1'/>
        <SecondaryText fontSize='md'>
          No food was found!
        </SecondaryText>
        </HStack>
      </VStack>,
      {
        position: 'top-center',
        overflow: 'hidden',
        onClose: () => {
          notifyFeedback();
        }
      },
    );
  };


  const handlePredict = async () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      image.current = photo;
      setTakePhoto(false);

      const img = new Image();
      img.src = photo;

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const imgWidth = img.width;
        const imgHeight = img.height;

        const targetLength = Math.min(imgWidth, imgHeight);
        const cropWidth = Math.min(imgWidth, targetLength + 50);
        const cropHeight = Math.min(imgHeight, targetLength + 50);

        const cropX = (imgWidth - cropWidth) / 2;
        const cropY = (imgHeight - cropHeight) / 2;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        const croppedImage = canvas.toDataURL("image/png");

        try {

          const data = await predict(notifyError, croppedImage);

          progress.current = data.totalUnlocked;
          predictionId.current = data.predictionId;
          foodFound.current = null;
          unlockedAchievements.current = [];

          if (data.predicted !== 'none'){
            foodFound.current = foodDetails.find((i) => i.id === data.predicted);
            if (data.unlockedAchievements.length) {
              unlockedAchievements.current = data.unlockedAchievements;
            }
            selectedFeedback.current = '';
            setOpen(true);
          } else {
            selectedFeedback.current = '';
            notifyNotFound();
            setTakePhoto(true);
          }
        } catch (err) {
          setTakePhoto(true);
        }
      }
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setTakePhoto(true);
    notifyFeedback();
    for(const i of unlockedAchievements.current) {
      notifyAchievement(i);
    }
  }

  const handleCloseFeedback = () => {
    sendFeedback(notifyError, predictionId.current, 'no');
    onFeedbackClose();
  }

  const handleSubmitFeedback = () => {
    sendFeedback(notifyError, predictionId.current, selectedFeedback.current);
    onFeedbackClose();
  };

  return (
    <Box>
      <ToastContainer />
      <FeedbackModal initialRef={initialRef} onClose={handleCloseFeedback} isOpen={isFeedbackOpen} selectedFeedback={selectedFeedback} onClick={handleSubmitFeedback}/>
      {error && (
        <Box bg='white' w='100vw' h='100vh' position='fixed'>
          <VStack h='100%' justifyContent='center' alignItems='center'>
            <Text>Camera not found. Check permission if you have a camera.</Text>
          </VStack>
        </Box>
      )}
      <Box h='100vh' w='100vw' bg='black'>
        {/* <Box h='100vh' w='100vw' bg='black'/> */}
        {takePhoto && !error && (
          <>
          <Camera
            ref={camera}
            facingMode='environment'
            errorMessages={{
              noCameraAccessible: <CatchError setError={setError} />,
              permissionDenied: <CatchError setError={setError} />,
              switchCamera: <CatchError setError={setError} />,
            }}
            numberOfCamerasCallback={setNumberOfCameras}
          />
          <Center w='100%' h='100%' position='fixed' w='100%'>
            <ChakraImage src={focus_square} w='300px' userSelect='none' draggable='false'/>
          </Center>
          </>
        )}
        {!takePhoto && <ChakraImage src={image.current} alt='Captured' width='100%' height={'100vh'} position='absolute' />}

        {!error && takePhoto &&
        <HStack position='fixed' w='100%' bottom='100px' justifyContent='space-around'>
            {
            camera.current?.torchSupported?
              <Icon
              as={SunIcon}
              padding={2}
              color='primary.1'
              bg = {toggledTorch ? '#FFFFFF66' : 'transparent'}
              transition = 'all 0.2s'
            boxSize='55px'
              borderColor='primary.1'
              borderWidth={5}
              borderRadius='50%'
              cursor={'pointer'}
              onClick={() => {
                setToggledTorch(prev => !prev);
                if (camera.current) {
                  camera.current.toggleTorch();
                }
              }}/>
              :
              <Box w='50px' h='50px'/>
            }

            <ChakraImage
            src={circleLogo}
            boxSize='80px'
            cursor='pointer'
              borderRadius='100%'
              transition = 'all 0.2s'
            _active={{
                bg: '#FFFFFF66'
            }}
            onClick={() => {
              handlePredict();
            }}
            />

            {
            numberOfCameras >= 2?
            <Icon
            as={RepeatIcon}
            padding={2}
            color='primary.1'
            boxSize='55px'
            borderColor='primary.1'
            borderWidth={5}
            borderRadius='50%'
            transition = 'all 0.2s'
            _active={{
                bg: '#FFFFFF66'
            }}
            cursor={'pointer'}
            onClick={() => {
              camera.current.switchCamera();
            }}/>
              :
              <Box w='50px' h='50px'/>
            }
        </HStack>
        }
      </Box>
      <FoodDrawer
        progress={progress.current}
        food={foodFound.current}
        open={open}
        setOpen={setOpen}
        onClose={handleDrawerClose}
        onClick={handleDrawerClose}
      />
    </Box>
  );
};

export { Capture };
