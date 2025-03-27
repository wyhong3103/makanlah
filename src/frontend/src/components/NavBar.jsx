import { Tabs, TabList, Tab, TabIndicator, Text, VStack, Box, Center } from '@chakra-ui/react';
import Leaderboard from '@/assets/svgs/leaderboard.svg?react';
import Camera from '@/assets/svgs/camera.svg?react';
import Profile from '@/assets/svgs/profile.svg?react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { leaderboard } from '@/apis';

let tabs = [
  {
    logo: Leaderboard,
    text: 'Leaderboard',
    link: '/leaderboard',
  },
  {
    logo: Camera,
    text: 'Capture',
    link: '/',
  },
  {
    logo: Profile,
    text: 'You',
    link: '/you',
  },
];

const NavBar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <Box position='fixed' w='100%' bottom='10px' zIndex={2}>
      <Center>
        <Tabs
          bg='primary.1'
          w='xs'
          isFitted
          variant={'unstyled'}
          justify='center'
          color='primary.4'
          borderRadius={'15px'}
          boxShadow='md'
        >
          <TabList margin={0} padding={0}>
            {tabs.map((tab) => (
              <Tab
                key={tab.text}
                color={location.pathname === tab.link && 'secondary.1'}
                fill={location.pathname === tab.link && 'currentColor'}
                onClick={() => navigate(tab.link)}
                p={'5px'}
              >
                <VStack gap='3px' position='relative' bottom='-2px'>
                  <tab.logo height='25px' style={{ fill: 'currentColor' }} color='primary.4' />
                  <Text fontSize='sm'> {tab.text} </Text>
                </VStack>
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Center>
    </Box>
  );
};

export default NavBar;
