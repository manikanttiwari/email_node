const nodemailer = require("nodemailer");

const User = require('../models/UserModel')

exports.sendOtp = async (req, res, next) => {
    try {
        let OTP = Math.floor(10000 + Math.random() * 90000).toString();
        let users = await User.find({ _id: req.body.user_id })
        if (users === undefined || users.length == 0) {
            return res.status(401).json({
                success: false,
                msg: 'user-not-found'
            })
        }
        let user = users[0];
        user.otp = OTP;
        user.otp_verified = false;

        // Email service
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "manikant.cool20@gmail.com",
                pass: "waikgklhkstcuihs"
            },
        });

        let options = {
            from: 'manikant.cool20@gmail.com',
            to: user.email,
            subject: "Testing",
            html: `<b>Your OTP is ${OTP}</b>`,
        }

        transporter.sendMail(options, async function (error, info) {
            if (error) {
                if (error.code === 'EENVELOPE' && error.command === 'API') {
                    return res.status(403).json({
                        success: false,
                        msg: 'email-recipient-not-found',
                        email: user.email
                    })
                }
                return res.status(403).json({
                    success: false,
                    msg: 'Internal server error'
                })
            } else {
                await User.updateOne({ _id: req.body.user_id }, { $set: user })
                return res.status(200).json({
                    success: true,
                    msg: 'otp-sent'
                })
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}


exports.verifyOtp = async (req, res, next) => {
    try {
        let users = await User.find({ _id: req.body.user_id })
        if (users === undefined || users.length == 0) {
            return res.status(401).json({
                success: false,
                msg: 'user-not-found'
            })
        }
        let user = users[0];
        if (req.body.otp === user.otp) {
            user.otp_verified = true;
            await User.updateOne({ _id: req.body.user_id }, { $set: user })
            return res.status(200).json({
                success: true,
                msg: 'otp-verified'
            })
        } else {
            return res.status(200).json({
                success: false,
                msg: 'invalid-otp'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

exports.updatePassword = async (req, res, next) => {
    try {
        let users = await User.find({ _id: req.body.user_id })
        if (users === undefined || users.length == 0) {
            return res.status(401).json({
                success: false,
                msg: 'user-not-found'
            })
        }
        let user = users[0];
        if (user.otp_verified === true) {
            user.password = req.body.password;
            user.otp_verified = false;
            await User.updateOne({ _id: req.body.user_id }, { $set: user })
            return res.status(200).json({
                success: true,
                msg: 'Password changed successfully'
            })
        } else {
            return res.status(401).json({
                success: false,
                msg: 'Unable to update password'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

