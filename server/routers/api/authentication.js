const express = require('express');
const Router = express.Router();

const authController = require('../../controllers/authController');
const userController = require('../../controllers/userController');

function loginRequired(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.send(401);
    }
}

Router.post('/register', function (req, res) {
    authController.register(req, res);
});

Router.post('/authenticate', function (req, res) {
    authController.authenticate(req, res);
});

Router.post('/verify', function (req, res) {
    userController.verifyAccount(req, res);
});

Router.post('/resend-token-verify', function (req, res) {
    userController.ResendTokenVerify(req, res);
});

Router.get('/secret-resource', loginRequired, function (req, res) {
    res.status(200).json({msg: "success"});
});

module.exports = Router;