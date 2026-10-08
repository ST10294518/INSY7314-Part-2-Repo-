function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(`[${new Date().toISOString()}] Unhandled error:`, err);

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ message: 'Malformed JSON in request body.' });
  }

  res.status(500).json({ message: 'An unexpected error occurred.' });
}

function notFound(req, res) {
  res.status(404).json({ message: 'Resource not found.' });
}

module.exports = { errorHandler, notFound };