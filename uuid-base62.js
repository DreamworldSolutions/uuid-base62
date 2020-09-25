import { v4 as uuidv4, parse as uuidParse, stringify as uuuidStringify } from 'uuid';

import base62 from './base62.js';

/**
 * Generates a new UUID represented in base62 format.
 */
export const uuidBase62 = () => {
  return toBase62(uuidv4());
};

/**
 * Returns a base62 string representing the input UUID V4.
 * @param {string} uuid A string representing a UUID V4 
 */
export const toBase62 = (uuid) => {
  return base62.encode(uuidParse(uuid)).join("");
};

export const fromBase62 = (uuidBase62) => {
  let bytes = toByteArray(uuidBase62);
  let decodedBytes = base62.decode(bytes);
  return uuuidStringify(decodedBytes);
};

const toByteArray = (base62Str) => {
  let bytes = [];
  for (let i in base62Str) {
    let c = base62Str[i];
    bytes.push(c.charCodeAt(0));
  }
  return bytes;
};