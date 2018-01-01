const express = require('express');
const Router = express.Router();

const userController = require('../../controllers/userController');

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