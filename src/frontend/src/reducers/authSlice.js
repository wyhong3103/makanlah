import cookie from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';

const getIsVerified = () => {
  return (
    cookie.get('accessToken') &&
    cookie.get('user') !== undefined &&
    cookie.get('user') !== null &&
    JSON.parse(cookie.get('user')).isEmailVerified
  );
};

const getInitialState = () => {
  let initialState = {};
  try {
    initialState = {
      user: cookie.get('user') !== undefined ? JSON.parse(cookie.get('user')) : {},
      isVerified: getIsVerified() ? true : false,
      accessToken: cookie.get('accessToken') ? cookie.get('accessToken') : '',
      refreshToken: cookie.get('refreshToken') ? cookie.get('refreshToken') : '',
    };
  } catch (err) {
    console.error(err);
    initialState = {
      user: {},
      isVerified: false,
      accessToken: '',
      refreshToken: '',
    };
  }

  return initialState;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isVerified = action.payload.user.isEmailVerified;
      cookie.set('user', JSON.stringify(action.payload.user));
      cookie.set('isVerified', JSON.stringify(action.payload.user.isEmailVerified));
      cookie.set('accessToken', action.payload.accessToken);
      cookie.set('refreshToken', action.payload.refreshToken);
    },
    REFRESH: (state, action) => {
      state.accessToken = action.payload.accessToken;
      cookie.set('accessToken', action.payload.accessToken);
    },
    LOGOUT: (state) => {
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
      state.isVerified = false;
      cookie.set('user', JSON.stringify(null));
      cookie.set('isVerified', JSON.stringify(false));
      cookie.set('accessToken', '');
      cookie.set('refreshToken', '');
    },
    UPDATE: (state, action) => {
      state.user = action.payload;
      cookie.set('user', JSON.stringify(action.payload));
    },
  },
});

export const { LOGIN, LOGOUT, UPDATE, REFRESH } = authSlice.actions;
export default authSlice.reducer;
