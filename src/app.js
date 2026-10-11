const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const gigRoutes = require('./routes/gigRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.disable('x-powered-by');

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'HustleHub API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
