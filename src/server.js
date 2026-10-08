const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

const PORT = process.env.PORT || 5443;
const KEY_PATH = process.env.SSL_KEY_PATH || './certs/key.pem';
const CERT_PATH = process.env.SSL_CERT_PATH || './certs/cert.pem';

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET is not set. Copy .env.example to .env and set a secret.');
  process.exit(1);
}

let sslOptions;
try {
  sslOptions = {
    key: fs.readFileSync(KEY_PATH),
    cert: fs.readFileSync(CERT_PATH),
  };
} catch (err) {
  console.error(
    `FATAL: Could not read SSL key/cert at "${KEY_PATH}" / "${CERT_PATH}". ` +
      'Generate a local certificate before starting the server.'
  );
  process.exit(1);
}

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HustleHub API listening securely on https://localhost:${PORT}`);
});