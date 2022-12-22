import { v4 as uuidv4, parse as uuidParse, stringify as uuidStringify } from '@dreamworld/uuid';

import base62 from './base62.js';

export const uuid = () => {
  return uuidv4();
}

/**
 * Generates a new UUID represented in base62 format.
 */
export const uuidBase62 = () => {
  return toBase62(uuidv4());
};

/**
 * @param {string} uuid A string representing a UUID V4 
 * @returns {String} A UUID represented in base62 format.
 */
export const toBase62 = (uuid) => {
  return base62.encode(uuidParse(uuid)).join("");
};


/**
 * @param {String} uuidBase62 A uuid represented in base62 format.
 * @returns {String} A UUID V4 representation
 */
export const fromBase62 = (uuidBase62) => {
  let bytes = toByteArray(uuidBase62);
  let decodedBytes = base62.decode(bytes);
  return uuidStringify(decodedBytes);
};


/**
 * Creates byte[] for a String.
 * Array size will be equals to the String's length. And array element 
 * will represent the ascii (char-code) value of the string character.
 * 
 * @param {String} base62Str
 */
const toByteArray = (base62Str) => {
  let bytes = [];
  for (let i in base62Str) {
    let c = base62Str[i];
    bytes.push(c.charCodeAt(0));
  }
  return bytes;
};