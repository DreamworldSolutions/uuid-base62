
const STANDARD_BASE = 256;
const TARGET_BASE = 62;

const CHAR_CODE = {
  ZERO: '0'.charCodeAt(0),
  NINE: '9'.charCodeAt(9),
  a: 'a'.charCodeAt(0),
  z: 'z'.charCodeAt(0),
  A: 'A'.charCodeAt(0),
  Z: 'Z'.charCodeAt(0)
};

export class Base62 {

  constructor(alphabet) {
    this.alphabet = alphabet || CharacterSets.GMP; // Array of characters
    this.lookup = [];
    this.createLookupTable();
  }

  /**
   * Creates the lookup table from character to index of character in character set.
   */
  createLookupTable() {
    let lookup = this.lookup = [];
    let alphabet = this.alphabet;
    for (let i = 0; i < alphabet.length; i++) {
      lookup[alphabet[i].charCodeAt(0)] = i & 0xff;
    }
  }

  /**
   * Encodes a sequence of bytes in Base62 encoding.
   * @param {byte[]} message a byte array
   * @returns a byte[] of Base62-encoded bytes.
   */
  encode(message) {
    let indices = this.convert(message, STANDARD_BASE, TARGET_BASE);
    return this.translate(indices, this.alphabet);
  }

  /**
   * Decodes a sequence of Base62-encoded bytes.
   * @param {byte[]} encoded  a sequence of Base62-encoded bytes.
   * @returns a byte sequence
   */
  decode(encoded) {
    if (!this.isBase62Encoding(encoded)) {
      throw new Error("Input is not encoded correctly");
    }
    let prepared = this.translate(encoded, this.lookup);
    return this.convert(prepared, TARGET_BASE, STANDARD_BASE);
  }


  /**
   * Checks whether a sequence of bytes is encoded over a Base62 alphabet.
   * @param {byte[]} bytes a sequence of bytes.
   * @returns `true` when the bytes are encoded over a Base62 alphabet, `false` otherwise.
   */
  isBase62Encoding(bytes) {
    if (!bytes) {
      return false;
    }

    let e;
    for (let i in bytes) {
      e = bytes[i];
      if (CHAR_CODE.ZERO > e || CHAR_CODE.NINE < e) {
        if (CHAR_CODE.a > e || CHAR_CODE.z < e) {
          if (CHAR_CODE.A > e || CHAR_CODE.Z < e) {
            return false;
          }
        }
      }
    }

    return true;
  }

  /**
   * Converts given message (as byte[]), where each byte is in `sourceBase` base system, 
   * to the byte[] where each byte is in `targetBase` base system.
   * @param {Byte[]} message 
   * @param {Number} sourceBase 
   * @param {Number} targetBase 
   * @returns {Byte[]} converted message where each byte is represented in `targetBase`
   *  system.
   */
  convert(message, sourceBase, targetBase) {
    let out = [];
    let source = message;

    let quotient, remainder, i, accumulator, digit;
    while (source.length > 0) {
      quotient = [];
      remainder = 0;

      for (i = 0; i < source.length; i++) {
        accumulator = (source[i] & 0xFF) + remainder * sourceBase;
        digit = (accumulator - (accumulator % targetBase)) / targetBase;

        remainder = accumulator % targetBase;

        if (quotient.length > 0 || digit > 0) {
          quotient.push(digit);
        }
      }
      out.push(remainder);
      source = quotient;
    }

    // pad output with zeroes corresponding to the number of leading zeroes in the message
    for (i = 0; i < message.length - 1 && message[i] == 0; i++) {
      out.push(0);
    }

    return this.reverse(out);
  }

  /**
   * Reverses a byte array.
   */
  reverse(arr) {
    let length = arr.length;

    let reversed = [];

    for (let i = 0; i < length; i++) {
      reversed[length - i - 1] = arr[i];
    }

    return reversed;
  }

  /**
   * Uses the elements of a byte array as indices to a dictionary and returns the corresponding values
   * in form of a byte array.
   */
  translate(indices, dictionary) {
    let translation = []

    for (let i = 0; i < indices.length; i++) {
      translation[i] = dictionary[indices[i]];
    }

    return translation;
  }
}

export const CharacterSets = {
  GMP: Array.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),
  INVERTED: Array.from('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
};

const base62 = new Base62();
export default base62;
