const express = require('express');
const router = express.Router();

const { createUser, login, updateUser, getUser } = require('../controller/UserController');
const { sendOtp, verifyOtp, updatePassword } = require('../controller/OtpController')
const { validateUserDetail, sendError } = require('../validations/validator')

router.post('/create-user', validateUserDetail('create-user'), sendError, createUser)

router.post('/login', login)

router.post('/update-user', validateUserDetail('update-user'), sendError, updateUser)

router.post('/get-user', getUser)

router.post('/send-otp', sendOtp)

router.post('/verify-otp', verifyOtp)

router.post('/update-password', updatePassword)

module.exports = router