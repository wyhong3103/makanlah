import { useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { compressImage } from '@/utils';

const useYou = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getYou = async () => {
    try {
      setLoading(true);
      const response = await _fetch(`/user/you`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw Error('Failed to get your information');
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, getYou };
};

const useUpdateYou = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(false);

  const updateYou = async (notifyError, notifySuccess, name, newPassword, oldPassword, image) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (image) {
        const compressdImage = await compressImage(image);
        formData.append('image', compressdImage);
      }
      if (name) {
        formData.append('name', name);
      }
      if (newPassword.length) {
        formData.append('new_password', newPassword);
        formData.append('old_password', oldPassword);
      }

      if (!image && !name && !newPassword) {
        notifyError('Nothing to be update !');
        return;
      }
      const response = await _fetch('/user/you', { method: 'PUT', body: formData }, true);
      const result = await response.json();
      if (!response.ok) {
        throw Error(result.message);
      } else {
        notifySuccess('Successfully updated!');
      }
      return result;
    } catch (err) {
      notifyError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateYou };
};

export { useYou, useUpdateYou };
