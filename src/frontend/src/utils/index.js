import imageCompression from 'browser-image-compression';

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 640,
  useWebWorker: true,
};

export const compressImage = async (image) => {
  return await imageCompression(image, options);
};
