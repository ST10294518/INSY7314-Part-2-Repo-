const bcrypt = require('bcryptjs');
const userStore = require('../models/userStore');
const generateToken = require('../utils/generateToken');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;

async function register(req, res, next) {
  try {
    const { email, password, role } = req.body;

    const existing = userStore.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = userStore.createUser({ email, passwordHash, role });
    const token = generateToken(user);

    return res.status(201).json({
      message: 'Registration successful.',
      user: userStore.toSafeUser(user),
      token,
    });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = userStore.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful.',
      user: userStore.toSafeUser(user),
      token,
    });
  } catch (err) {
    return next(err);
  }
}

async function getProfile(req, res, next) {
  try {
    const user = userStore.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ user: userStore.toSafeUser(user) });
  } catch (err) {
    return next(err);
  }
}

module.exports = { register, login, getProfile };