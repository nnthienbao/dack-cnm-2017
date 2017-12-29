const jwt = require('jsonwebtoken');

const validateUser = require('../common/validateUser');
const userController = require("../controllers/userController");
const User = require('../models/User');

const secret = require('../secret-auth.json').secret;

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
    User.findOne({username: req.body.username})
        .then(user => {
            if(user === null) {
                return res.status(400).json({msg: "Authenticate fail"});
            }
            if(!user.comparePassword(req.body.password)) {
                return res.status(400).json({msg: "Authenticate fail"});
            }
            const payload = {
                _id: user._id,
                username: user.username,
                email: user.email
            };
            jwt.sign(payload, secret, { expiresIn: 60 * 60 }, function (err, token) {
                if(err) return res.status(500);
                res.status(200).json({token: token});
            })
        })
        .catch(err => {
            res.send(500);
        })
}