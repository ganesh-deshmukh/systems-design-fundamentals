// import Advanced Encryption Standard package 256
const aes256 = require('aes256');                           

// key to encrypt/decrypt data (ex. plaintext)
const key = 'special-key-1';
const otherKey = 'special-key-2';

// what we want to encrypt
const plaintext = 'SystemsExpert is aight';

// encrypt data
const encrypted = aes256.encrypt(key, plaintext);
console.log('Encrypted:', encrypted);     //=> MChYiJISzw+2D40b0LB/XNPLzgzxCOeD9ElWXBJZ8enkaHuMj2k=

// decrypt data, note how we pass in the same key we used to encrypt
const decrypted = aes256.decrypt(key, encrypted);
console.log('Decrypted:', decrypted);     //=> SystemsExpert is aight

// when we try to decrypt with different key as the encrypted key
const failedDecrypted = aes256.decrypt(otherKey, encrypted);
console.log('Failed Decrypted:', failedDecrypted);    //=> �Vm�խ��˕ps�.1!�hw


// RUNNING THIS (in terminal):
// 1) npm install aes256
// 2) node encryption.js

// QUESTIONS
// - why does running this file multiple times result in different encrypted data?
//   - similar concept to hashing w/ salting?
