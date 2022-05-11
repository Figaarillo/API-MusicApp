const express = require('express');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const { validatorRegisterUser, validatorLoginUser } = require('../validators/auth');
const router = express.Router();

/**
 * TODO: http://localhost:3000/api/auth/register
 */
router.post('/register', validatorRegisterUser, registerCtrl);

/**
 * TODO: http://localhost:3000/api/auth/login
 */ 
router.post('/login', validatorLoginUser, loginCtrl);
module.exports = router;
