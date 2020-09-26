# uuid-base62
A Base62 UUID generator.

> base62 encoding/decoding is based on [seruco/base62](https://github.com/seruco/base62). Because, same is being used by our server code in java.


## Install

```
npm install @dreamworld/uuid-base62
```

## Usage

```js
import { uuidBase62, toBase62, fromBase62 } from '@dreamworld/uuid-base62';

//To generate a new uuid in base62 format
let newBase62uuid = uuidBase62(); //Will return a string like '68S8PT4GInJDiFea3wQE8F'

//From regular UUID to base62 and vice versa
let uuid = 'da5e2434-1516-4ae4-a05c-afeaebc2219f';
let base62uuid= toBase62(uuid); // Will produce  '6e3LhWSeLvHYCEAn0fIMfP'
let parsedUuid = fromBase62(base62uuid); //Will produce back 'da5e2434-1516-4ae4-a05c-afeaebc2219f'
```