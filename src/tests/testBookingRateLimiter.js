
const assert = require('node:assert/strict');
const express = require('express');
const bookingRateLimiter =
  require('../middleware/authRateLimiter');

async function runTests() {
  const app = express();

  app.set('trust proxy', false);

  app.post(
    '/test-booking',
    bookingRateLimiter,
    (req, res) => {
      res.status(200).json({
        message: 'Booking request accepted.',
      });
    }
  );

  const server = app.listen(0);

  try {
    await new Promise((resolve) => {
      if (server.listening) return resolve();
      server.once('listening', resolve);
    });

    const address = server.address();

    if (!address) {
      throw new Error('Test server did not start.');
    }

    const url =
      `http://127.0.0.1:${address.port}/test-booking`;

    for (let i = 1; i <= 10; i++) {
      const response = await fetch(url, {
        method: 'POST',
      });

      assert.equal(
        response.status,
        200,
        `Request ${i} should be accepted`
      );
    }

    const blocked = await fetch(url, {
      method: 'POST',
    });

    assert.equal(blocked.status, 429);

    const body = await blocked.json();

    assert.match(
      body.message,
      /too many booking requests/i
    );

    assert.ok(
      blocked.headers.get('ratelimit')
    );

    console.log(
      'PASS: First 10 requests accepted.'
    );

    console.log(
      'PASS: 11th request blocked with HTTP 429.'
    );

    console.log(
      'PASS: Rate-limit headers and error response verified.'
    );

    console.log(
      'All booking rate-limiting tests passed.'
    );
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) =>
        error ? reject(error) : resolve()
      );
    });
  }
}

runTests().catch((error) => {
  console.error('Test failed:', error);
  process.exitCode = 1;
});
