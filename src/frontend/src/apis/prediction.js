import { useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { compressImage } from '@/utils';

function base64ToBlob(base64) {
  const mimeType = base64.split(';')[0].split(':')[1];
  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset++) {
    byteArrays.push(byteCharacters.charCodeAt(offset));
  }

  return new Blob([new Uint8Array(byteArrays)], { type: mimeType });
}

const usePredict = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(true);

  const predict = async (notifyError, base64Img) => {
    try {
      setLoading(true);
      const image = base64ToBlob(base64Img);

      const formData = new FormData();
      const compressdImage = await compressImage(image);
      formData.append('image', compressdImage, 'image.png');

      const response = await _fetch(
        '/prediction',
        {
          method: 'POST',
          body: formData,
        },
        true,
      );

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

  return { loading, predict };
};

const useSendFeedback = () => {
  const _fetch = useFetch();
  const [loading, setLoading] = useState(true);

  const sendFeedback = async (notifyError, predictionId, feedback) => {
    try {
      setLoading(true);

      const response = await _fetch('/prediction/feedback', {
        method: 'POST',
        body: JSON.stringify({
          predictionId,
          feedback,
        }),
      });

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

  return { loading, sendFeedback };
};

export { usePredict, useSendFeedback };
