import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Capture, Leaderboard, You, NotFound } from '@/pages';
import { NavBar, Title } from '@/components';
import { Box } from '@chakra-ui/react';

const Wrapper = () => {
  const location = useLocation();

  return (
    <Box h='100vh' w='100vw' position='relative'>
      {location.pathname !== '/you' && <Title />}
      <Outlet />
      <NavBar />
    </Box>
  );
};

export const protRoutes = [
  {
    path: '/you',
    element: <Wrapper />,
    children: [{ path: '', element: <You /> }],
  },
  {
    path: '/',
    element: <Wrapper />,
    children: [{ path: '', element: <Capture /> }],
  },
  {
    path: '/leaderboard',
    element: <Wrapper />,
    children: [{ path: '', element: <Leaderboard /> }],
  },
  {
    path: '*',
    element: <Wrapper />,
    children: [{ path: '*', element: <NotFound/> }],
  },
];
