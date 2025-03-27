import { Box, Center, HStack, VStack, Avatar } from '@chakra-ui/react';
import { TopLeaderboardAvatar, SecondaryText, Scrolling, PrimaryText } from '../components';
import { avatarFirst, avatarSecond, avatarThird } from '../assets';
import { leaderboard } from '@/apis';
import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const { loading: leaderboardLoading, error: leaderboardError, getLeaderboard } = leaderboard.useLeaderboard();
  const { data: userRankData, loading: userRankLoading, error: userRankError, getUserRank } = leaderboard.useUserRank();
  const [leaderboardData, setLeaderboardData] = useState([]);
  useEffect(() => {
    const f = async () => {
      const data = await getLeaderboard();
      setLeaderboardData(data);
      getUserRank();
    };
    f();
  }, []);

  return (
    <VStack pt={'15vh'} bg={'primary.1'} overflow={'hidden'} position={'relative'} width={'100%'} height={'100vh'}>
      {!leaderboardLoading && leaderboardData.length && (
        <Box w='100%' maxW={{ base: 'xs', md: 'md' }}>
          <Center>
            <VStack w='100%'>
              <TopLeaderboardAvatar
                isGold={true}
                src={leaderboardData[0].image}
                totalUnlocked={leaderboardData[0].totalUnlocked}
                color={'#EBAB2E'}
                avatarBadgeIcon={avatarFirst}
                width='100px'
                height='100px'
              />
              <PrimaryText fontSize='md' color={'#EBAB2E'}>
                {leaderboardData[0].name}
              </PrimaryText>
              <HStack mt={5} gap={10}>
                <VStack>
                  <TopLeaderboardAvatar
                    src={leaderboardData[1].image}
                    isGold={false}
                    totalUnlocked={leaderboardData[1].totalUnlocked}
                    color={'#8A8B90'}
                    avatarBadgeIcon={avatarSecond}
                    width='80px'
                    height='80px'
                  />
                  <PrimaryText fontSize='sm' color={'#8A8B90'}>
                    {leaderboardData[1].name}
                  </PrimaryText>
                </VStack>
                <VStack>
                  <TopLeaderboardAvatar
                    src={leaderboardData[2].image}
                    totalUnlocked={leaderboardData[2].totalUnlocked}
                    isGold={false}
                    color={'#A76342'}
                    avatarBadgeIcon={avatarThird}
                    size='md'
                    width='80px'
                    height='80px'
                  />
                  <PrimaryText fontSize='sm' color={'#A76342'}>
                    {leaderboardData[2].name}
                  </PrimaryText>
                </VStack>
              </HStack>
            </VStack>
          </Center>
          <VStack mt='10px'>
            {!userRankLoading && (
              <>
                <Box width='3xs' px='10px' py='3px' borderRadius='10px' w='100%'>
                  <HStack color='neutral.1' gap={3} width='100%' justifyContent={'space-between'} pr='15px'>
                    <HStack gap={3}>
                      <Box w='30px'>
                        <SecondaryText textAlign='center' fontWeight='bold'>#</SecondaryText>
                      </Box>
                      <SecondaryText fontWeight='bold'>User</SecondaryText>
                    </HStack>
                    <Box fontWeight='bold'>Total Unlocked</Box>
                  </HStack>
                </Box>
                <Box color='primary.3' bg='secondary.1' width='3xs' p='10px' borderRadius='10px' w='100%'>
                  <HStack color='primary.1' gap={3} width='100%' justifyContent={'space-between'} pr='15px'>
                    <HStack gap={3}>
                      <Box w='30px'>
                        <SecondaryText textAlign='center'>{userRankData.rank}</SecondaryText>
                      </Box>
                      <Avatar src={userRankData.image} size='sm' bg='primary.3' />
                      <SecondaryText>{userRankData.name}</SecondaryText>
                    </HStack>
                    <Box>{userRankData.totalUnlocked}</Box>
                  </HStack>
                </Box>
                <Scrolling usersData={leaderboardData} userId={userRankData.id} />
              </>
            )}
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export { Leaderboard };
