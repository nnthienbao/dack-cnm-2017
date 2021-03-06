const jwt = require('jsonwebtoken');

const validateUser = require('../validation/validateUser');
const userController = require("../controllers/userController");
const User = require('../models/User');

const secret = require('../secret.json').jwtSecret;

module.exports.register = function (req, res) {
    validateUser.validateUserRegister(req.body)
        .then(function ({errors, isValid}) {
            if(!isValid) {
                return res.status(400).json(errors);
            }

            userController.createUser(req, res);
        });
}

module.exports.authenticate = function (req, res) {
    validateUser.validateUserLogin(req.body)
        .then(function ({errors, isValid}) {
            if(!isValid) {
                return res.status(400).json(errors);
            }

            User.findOne({username: req.body.username})
                .then(user => {
                    if(user === null) {
                        return res.status(401).json({
                            auth: "Thông tin đăng nhập không hợp lệ",
                        })
                    }
                    if(!user.comparePassword(req.body.password)) {
                        return res.status(401).json({
                            auth: "Thông tin đăng nhập không hợp lệ"
                        })
                    }
                    if(!user.isVerified) {
                        return res.status(401).json({
                            auth: "Tài khoản chưa xác thực"
                        })
                    }
                    const payload = {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin
                    };
                    console.log(user);
                    console.log(payload);
                    jwt.sign(payload, secret, { expiresIn: 60 * 60 }, function (err, token) {
                        if(err) return res.status(500);
                        res.status(200).json({token: 'Bearer ' + token});
                    })
                })
                .catch(err => {
                    res.send(500);
                })
        });
}