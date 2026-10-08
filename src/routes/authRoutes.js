const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { registerRules, loginRules, handleValidationErrors } = require('../middleware/validators');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerRules, handleValidationErrors, register);
router.post('/login', loginRules, handleValidationErrors, login);
router.get('/me', protect, getProfile);

module.exports = router;