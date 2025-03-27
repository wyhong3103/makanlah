import { Drawer } from 'vaul';
import { Box, VStack, Heading, Text, Progress, Grid, GridItem, Image, HStack } from '@chakra-ui/react';

import { SecondaryText, PrimaryButton } from '@/components';

const FoodDrawer = ({ food, onClick, date = '', found = true, progress = 0, ...rest }) => {
  if (!food) {
    return <></>;
  }
  return (
    <Drawer.Root {...rest}>
      <Drawer.Title></Drawer.Title>
      <Drawer.Portal>
        <Drawer.Overlay
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 12,
          }}
        />
        <Drawer.Content
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            outline: 'none',
            height: 'fit-content',
            zIndex: 13,
          }}
        >
          <Drawer.Description />
          <Box w='100vw' bg='white' borderTopRadius={'30px'}>
            <VStack
              pt='20px'
              pb='10px'
              fontSize='md'
              w='100%'
              maxHeight='80vh'
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
              <Box w={{ base: 'sm', md: 'md' }}>
                {found ? (
                  <Heading fontSize='md' textAlign='center'>
                    You've found <span style={{ color: '#FB2C36' }}>{food.name}</span> !
                  </Heading>
                ) : (
                  <Heading fontSize='md' textAlign='center'>
                    {food.name}
                  </Heading>
                )}
                <Box>
                  <VStack marginX={10} pt={4}>
                    <Image width={'150px'} src={food.src} />
                    {found ? (
                      <>
                        <HStack width={'100%'} justifyContent={'space-between'} fontWeight={'bold'} fontSize='sm'>
                          <SecondaryText> Foods Unlocked </SecondaryText>
                          <SecondaryText> {`${progress} / 30`} </SecondaryText>
                        </HStack>
                        <Progress
                        value={(progress / 30) * 100}
                        width='100%'
                        height='10px'
                        borderRadius={'10px'}
                      />
                      </>
                    ) : (
                      <SecondaryText textAlign='end' w='100%' fontSize='xs' color='primary.4'>
                        Unlocked on {date}
                      </SecondaryText>
                    )}
                    <Text pt={3} width={'100%'} fontWeight={'bold'} fontSize='sm'>
                      Class
                    </Text>
                    <Heading width={'100%'} color={'secondary.1'} fontSize={'sm'} textAlign={'center'}>
                      {food.class}
                    </Heading>
                    <Text fontWeight={'bold'} pt={3} fontSize='sm' width={'100%'}>
                      Nutrition
                    </Text>
                    {food.nutrition.map((cat, index) => (
                      <Grid key={index} w={'100%'} templateColumns='repeat(6, 1fr)' gap={0}>
                        <GridItem borderLeftRadius={10} colSpan={4} h='10' bg={'primary.2'} pl={3} alignContent={'center'}>
                          {' '}
                          <SecondaryText fontSize='sm'> {cat.name} </SecondaryText>{' '}
                        </GridItem>
                        <GridItem
                          colSpan={2}
                          h='10'
                          color={'white'}
                          bg='secondary.1'
                          textAlign={'center'}
                          alignContent={'center'}
                          borderRightRadius={10}
                        >
                          <SecondaryText fontSize='sm'>{cat.content}</SecondaryText>
                        </GridItem>
                      </Grid>
                    ))}
                    <SecondaryText pt={3} width={'100%'} fontWeight={'bold'} fontSize='sm'>
                      About
                    </SecondaryText>

                    <SecondaryText fontSize='sm'>{food.desc}</SecondaryText>
                    <PrimaryButton mt={5} w={'100%'} onClick={onClick} fontSize='sm'>
                      Okay
                    </PrimaryButton>
                  </VStack>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const AchievementDrawer = ({ achievement, date = '', onClick, ...rest }) => {
  if (!achievement) {
    return <></>;
  }
  return (
    <Drawer.Root {...rest}>
      <Drawer.Title></Drawer.Title>
      <Drawer.Portal>
        <Drawer.Overlay
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 12,
          }}
        />
        <Drawer.Content
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            outline: 'none',
            height: 'fit-content',
            zIndex: 13,
          }}
        >
          <Drawer.Description />
          <Box w='100vw' bg='white' borderTopRadius={'30px'}>
            <VStack
              pt='20px'
              pb='10px'
              fontSize='md'
              w='100%'
              maxHeight='80vh'
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
              <Box w={{ base: 'sm', md: 'md' }}>
                <Heading fontSize='md' textAlign='center'>
                  {achievement.name}
                </Heading>
                <Box>
                  <VStack marginX={10} pt={4}>
                    <Image width={'150px'} src={achievement.src} />

                    <SecondaryText textAlign='end' w='100%' fontSize='xs' color='primary.4'>
                      Unlocked on {date}
                    </SecondaryText>
                    <SecondaryText pt={3} width={'100%'} fontWeight={'bold'} fontSize='sm'>
                      Description
                    </SecondaryText>
                    <SecondaryText fontSize='sm'>{achievement.desc}</SecondaryText>
                    <PrimaryButton mt={5} w={'100%'} onClick={onClick} fontSize='sm'>
                      Okay
                    </PrimaryButton>
                  </VStack>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const LockedDrawer = ({ type, item, onClick, ...rest }) => {
  if (!item) {
    return <></>;
  }
  return (
    <Drawer.Root {...rest}>
      <Drawer.Title></Drawer.Title>
      <Drawer.Portal>
        <Drawer.Overlay
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 12,
          }}
        />
        <Drawer.Content
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            outline: 'none',
            height: 'fit-content',
            zIndex: 13,
          }}
        >
          <Drawer.Description />
          <Box w='100vw' bg='white' borderTopRadius={'30px'}>
            <VStack
              pt='20px'
              pb='10px'
              fontSize='md'
              w='100%'
              maxHeight='80vh'
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
              <Box w={{ base: 'sm', md: 'md' }}>
                <Heading fontSize='md' textAlign='center'>
                  {item.name}
                </Heading>
                <Box>
                  <VStack marginX={10} pt={4}>
                    <Image className='locked' width={'150px'} src={item.src} />
                    <SecondaryText fontSize='md'>You've not unlocked this {type}.</SecondaryText>
                    <PrimaryButton mt={5} w={'100%'} onClick={onClick} fontSize='sm'>
                      Okay
                    </PrimaryButton>
                  </VStack>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export { FoodDrawer, AchievementDrawer, LockedDrawer };
