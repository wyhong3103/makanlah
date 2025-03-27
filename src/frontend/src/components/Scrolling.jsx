import { useState } from 'react';
import { Avatar, Box, Center, HStack, VStack } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SecondaryText } from './Text';
import { leaderboard } from '@/apis';

const Scrolling = ({ usersData, userId }) => {
  const [items, setItems] = useState(usersData);
  const [hasMore, setHasMore] = useState(true);

  const { loading: leaderboardLoading, error: leaderboardError, getLeaderboard } = leaderboard.useLeaderboard();

  const fetchMoreData = async () => {
    const newIndex = items.length;
    const data = await getLeaderboard(newIndex);
    if (data.length <= 0) {
      setHasMore(false);
    } else {
      setItems((prevItems) => [...prevItems, ...data]);
    }
  };

  return (
    <Box id='scrollable' overflowY='auto' mt='5px' width='100%' height='30vh'>
      <Center>
        <VStack width='100%'>
          <InfiniteScroll
            dataLength={items.length - 3}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<SecondaryText textAlign='center'>Loading...</SecondaryText>}
            scrollableTarget={'scrollable'}
          >
            {items.slice(3).map((user, index) =>
              user.id !== userId ? (
                <Box
                  key={index}
                  color='primary.3'
                  bg='primary.2'
                  mt='15px'
                  width='3xs'
                  p='10px'
                  borderRadius='10px'
                  w='100%'
                >
                  <HStack color='neutral.1' gap={3} width='100%' justifyContent={'space-between'} pr='15px'>
                    <HStack gap={3}>
                      <Box w='30px'>
                        <SecondaryText textAlign='center'>{index + 4}</SecondaryText>
                      </Box>
                      <Avatar src={user.image} size='sm' bg='primary.3'/>

                      <SecondaryText>{user.name}</SecondaryText>
                    </HStack>
                    <Box>{user.totalUnlocked}</Box>
                  </HStack>
                </Box>
              ) : (
                <></>
              ),
            )}
          </InfiniteScroll>
        </VStack>
      </Center>
    </Box>
  );
};

export default Scrolling;
