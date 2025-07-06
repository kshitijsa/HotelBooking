import imageCompression from 'browser-image-compression';

export async function compressImage(file, maxSizeMB = 0.5, maxWidthOrHeight = 1024) {
  const options = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Image compression error:', error);
    return file; // fallback to original if compression fails
  }
}
