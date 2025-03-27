import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { Auth, VerifyEmail } from '@/pages';
import { protRoutes } from './protected';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isVerified = useSelector((state) => state.auth.isVerified);

  const commonRoutes = [
    { path: '/auth', element: <Auth /> },
    { path: '/verify-email', element: <VerifyEmail /> },
  ];
  const protectedRoutes = isVerified ? protRoutes : [];

  const element = useRoutes([...commonRoutes, ...protectedRoutes, ]);

  useEffect(() => {
    if (!isVerified && !commonRoutes.map((i) => i.path).includes(location.pathname)) navigate('/auth');
  }, [isVerified]);

  return <>{element}</>;
};
