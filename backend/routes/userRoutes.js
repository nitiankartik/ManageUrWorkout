const express = require('express');

// constroller functions 
const { signupUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// login
router.post('/login', loginUser)


// signup route
router.post('/signup', signupUser)

module.exports = router;