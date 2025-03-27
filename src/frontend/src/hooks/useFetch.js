import config from '@/config';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REFRESH, LOGOUT } from '@/reducers/authSlice';

// A fetch hook that automatically embeds access token and base url
const useFetch = () => {
  const isVerified = useSelector((state) => state.auth.isVerified);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (url, options = {}, isForm = false) => {
      let headers = {};

      if (!isForm) {
        headers = {
          'Content-Type': 'application/json',
        };
      }

      if (isVerified && accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      let response = await fetch(`${config.apiUrl}${url}`, {
        ...options,
        headers,
      });

      if (refreshToken.length && response.status === 401) {
        const refreshRes = await fetch(`${config.apiUrl}/auth/refresh-tokens`, {
          method: 'POST',
          body: JSON.stringify({
            refreshToken,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!refreshRes.ok) {
          dispatch(LOGOUT());
        }

        const tokens = await refreshRes.json();

        dispatch(
          REFRESH({
            accessToken: tokens.access.token,
          }),
        );

        headers['Authorization'] = `Bearer ${tokens.access.token}`;

        response = await fetch(`${config.apiUrl}${url}`, {
          ...options,
          headers,
        });
      }

      return response;
    },
    [isVerified, accessToken],
  );

  return fetchData;
};

export default useFetch;
