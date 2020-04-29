const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route GET profile/me
// @desc Get current user profile
// @access Private