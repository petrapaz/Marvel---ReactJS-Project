// src/utils/hash.js
import md5 from 'md5';

export const getMarvelHash = (ts, privateKey, publicKey) => {
  return md5(ts + privateKey + publicKey);
};
