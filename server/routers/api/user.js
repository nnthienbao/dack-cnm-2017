const express = require('express');
const Router = express.Router();

const userController = require('../../controllers/userController');
const User = require('../../models/User');

function loginRequired(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

Router.get('/', loginRequired, function (req, res) {
    User.findOne({_id: req.user._id}).then(user => {
        if(!user) return res.sendStatus(401);

        const data = {
            username: user.username,
            email: user.email,
            address: user.key.address,
            realableWallet: user.realableWallet,
            availableWallet: user.availableWallet
        };

        return res.status(200).json(data);

    }).catch(err => {
        return res.status(500).json({msg: "Fail"});
    })
});

Router.post('/verify', function (req, res) {
    userController.verifyAccount(req, res);
});

Router.post('/resend-token-verify', function (req, res) {
    userController.ResendTokenVerify(req, res);
});

Router.post('/request-reset-password', function (req, res) {
    userController.requestResetPassword(req, res);
});

Router.post('/reset-password', function (req, res) {
    userController.resetPassword(req, res);
});

module.exports = Router;