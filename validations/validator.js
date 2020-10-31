const { check, validationResult } = require('express-validator');

// sending error to the client generated from the express-validator
exports.sendError = (req, res, next) => {
    const errorInValidation = validationResult(req);
    if (!errorInValidation.isEmpty()) {
        res.status(422).json({ success: false, msg: "validation-error", errors: errorInValidation.array() });
        return;
    } else {
        next();
    }
}

exports.validateUserDetail = (method) => {
    if (method === "create-user") {
        return [
            check('name').custom((value) => {
                if (isNaN(value)) {
                    return true;
                } else {
                    throw new Error('Please enter your name')
                }
            }),
            check('email').custom((value) => {
                if (value === undefined || value === "") {
                    throw new Error('Please enter an email')
                }
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    return true;
                } else {
                    throw new Error('Invalid email id')
                }
            }),
            check('password').custom((value) => {
                if (value === undefined || value === "") {
                    throw new Error('Please enter a password')
                } else if (value.toString().length < 6) {
                    throw new Error('Password must be at least 6 character long')
                } else {
                    return true;
                }
            }),
            check('country').custom((value) => {
                if (value === undefined || value === "") {
                    return true;
                } else if (value.toString().length >= 6) {
                    throw new Error('Password must be at least 6 character long')
                } else {
                    throw new Error('Invalid password')
                }
            }),
        ]
    } else if (method === 'update-user') {
        return [
            check('name').custom((value) => {
                if (value === undefined) {
                    return true
                }
                if (isNaN(value)) {
                    return true;
                } else {
                    throw new Error('Please enter your name')
                }
            }),
            check('email').custom((value) => {
                if (value === undefined) {
                    return true
                }
                if (value === undefined) {
                    throw new Error('Please enter an email')
                }
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    return true;
                } else {
                    throw new Error('Invalid email id')
                }
            }),
            check('password').custom((value) => {
                if (value === undefined) {
                    return true
                }
                if (value === undefined || value === "") {
                    throw new Error('Please enter a password')
                } else if (value.toString().trim().length < 6) {
                    throw new Error('Password must be at least 6 character long')
                } else {
                    return true;
                }
            }),
            check('country').custom((value) => {
                if (value === undefined || value === "") {
                    return true
                }
                if (value === undefined || value === "") {
                    return true;
                } else if (value.toString().length >= 6) {
                    throw new Error('Password must be at least 6 character long')
                } else {
                    throw new Error('Invalid password')
                }
            }),
        ]
    }
}