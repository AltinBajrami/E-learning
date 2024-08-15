import streamToBuffer from 'stream-to-buffer';

const convertStreamToBuffer = (stream) => {
  return new Promise((resolve, reject) => {
    streamToBuffer(stream, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
};

export default convertStreamToBuffer;
