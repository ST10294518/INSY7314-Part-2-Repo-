const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'HustleHub API is running.' });
});

app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;