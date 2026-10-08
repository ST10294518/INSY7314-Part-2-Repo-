
const assert = require('node:assert/strict');
const validateBooking = require('./middleware/bookingValidation');

function runTest(body) {
  let result = {
    status: 200,
    nextCalled: false,
    message: null,
  };

  const req = { body };

  const res = {
    status(code) {
      result.status = code;
      return this;
    },
    json(data) {
      result.message = data.message;
      return this;
    },
  };

  validateBooking(req, res, () => {
    result.nextCalled = true;
  });

  return result;
}

const validId = '507f1f77bcf86cd799439011';

assert.equal(runTest({ gigId: validId }).nextCalled, true);

assert.equal(runTest({}).status, 400);

assert.equal(runTest({ gigId: 'invalid' }).status, 400);

assert.equal(
  runTest({ gigId: validId, price: 1 }).status,
  400
);

assert.equal(
  runTest({ gigId: validId, client: 'another-user' }).status,
  400
);

assert.equal(runTest(null).status, 400);

console.log('All 6 booking validation tests passed.');

