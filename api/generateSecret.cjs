const crypto = require('crypto');

// Gerar uma chave secreta aleatória de 256 bits (32 bytes)
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);
