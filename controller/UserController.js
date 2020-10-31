const User = require('../models/UserModel');

exports.createUser = async (req, res, next) => {
    try {
        await User.create(req.body);
        return res.status(200).json({
            success: true,
            msg: 'Successfully registered'
        })
    } catch (error) {
        console.log(error)
        if (error.name === 'MongoError') {
            return res.status(400).json({
                success: false,
                msg: 'Email already exists'
            })
        }
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        let users = await User.find({ email: req.body.email, password: req.body.password });
        if (users === undefined || users.length == 0) {
            return res.status(401).json({
                success: false,
                msg: 'invalid-credential'
            })
        }
        let user = users[0];
        return res.status(200).json({
            success: true,
            msg: 'logged-in',
            user_id: user._id
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let users = await User.find({ _id: req.body.user_id })
        if (users === undefined || users.length == 0) {
            return res.status(401).json({
                success: false,
                msg: 'user-not-found'
            })
        }
        let user = users[0];
        if (req.body.name != undefined) {
            user.name = req.body.name
        }
        if (req.body.email != undefined) {
            user.email = req.body.email
        }
        if (req.body.country != undefined) {
            user.country = req.body.country
        }
        await User.updateOne({ _id: req.body.user_id }, { $set: user })
        return res.status(200).json({
            success: true,
            msg: 'Successfully updated'
        })
    } catch (error) {
        if (error.name === 'MongoError') {
            return res.status(400).json({
                success: false,
                msg: 'Email already exists'
            })
        }
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

exports.getUser = async(req, res, next) => {
    try {
        let users = await User.find({ _id: req.body.user_id })
        if (users === undefined || users.length == 0) {
            return res.status(401).json({
                success: false,
                msg: 'user-not-found'
            })
        }
        let user = users[0];
        let updUserObj = {
            name: user.name,
            email: user.email,
            country: user.country
        }
        return res.status(200).json({
            success: true,
            user: updUserObj
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}
