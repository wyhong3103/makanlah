import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN, LOGOUT } from '@/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { compressImage } from '@/utils';

const useLogin = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (verifyPage, notifyError, email, password) => {
    try {
      setLoading(true);
      const response = await _fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw Error(result.message);
      }
      dispatch(
        LOGIN({
          user: result.user,
          accessToken: result.tokens.access.token,
          refreshToken: result.tokens.refresh.token,
        }),
      );

      if (result.user.isEmailVerified) {
        navigate('/');
      } else {
        verifyPage();
      }
    } catch (err) {
      notifyError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

const useRegister = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const register = async (verifyPage, notifyError, name, email, password, image = null) => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (image) {
        const compressedImage = await compressImage(image);
        formData.append('image', compressedImage);
      }
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      const response = await _fetch('/auth/register', { method: 'POST', body: formData }, true);
      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message);
      }

      dispatch(
        LOGIN({
          user: result.user,
          accessToken: result.tokens.access.token,
          refreshToken: result.tokens.refresh.token,
        }),
      );
      verifyPage();
    } catch (err) {
      notifyError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};

const useSendVerificationEmail = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(false);

  const sendVerificationEmail = async (notifyError) => {
    try {
      setLoading(true);

      const response = await _fetch('/auth/send-verification-email', { method: 'POST' });

      if (!response.ok) {
        const result = await response.json();
        throw Error(result.message);
      }
    } catch (err) {
      notifyError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendVerificationEmail };
};

const useVerifyEmail = (token) => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const verifyEmail = async () => {
    try {
      const response = await _fetch(`/auth/verify-email?token=${token}`, { method: 'POST' });

      if (!response.ok) {
        const result = await response.json();

        throw Error(result.message);
      }

      dispatch(LOGOUT({}));
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return { loading, success, error };
};

const useLoginWithGoogle = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = async (notifyError, code) => {
    try {
      const response = await _fetch('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw Error(result.message);
      }
      dispatch(
        LOGIN({
          user: result.user,
          accessToken: result.tokens.access.token,
          refreshToken: result.tokens.refresh.token,
        }),
      );
      navigate('/');
    } catch (err) {
      notifyError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, loginWithGoogle };
};

const useLogout = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = useSelector((state) => state.auth.refreshToken);

  const logout = async () => {
    try {
      setLoading(true);
      const response = await _fetch('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({
          refreshToken,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw Error(result.message);
      }
      dispatch(LOGOUT({}));
      navigate('/auth');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

const useEmailExist = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(true);

  const getEmailExist = async (notifyError, loginEmail) => {
    try {
      const response = await _fetch(`/auth/email-exist`, { method: 'POST', body: JSON.stringify({ email: loginEmail }) });

      const result = await response.json();

      if (!response.ok) {
        throw Error(result.message);
      }

      return result;
    } catch (err) {
      notifyError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getEmailExist };
};

export { useLogin, useRegister, useSendVerificationEmail, useVerifyEmail, useLoginWithGoogle, useLogout, useEmailExist };
