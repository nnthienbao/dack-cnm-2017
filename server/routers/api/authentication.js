const express = require('express');
const Router = express.Router();

const authController = require('../../controllers/authController');

Router.post('/register', function (req, res) {
    authController.register(req, res);
});

Router.post('/authenticate', function (req, res) {
    authController.authenticate(req, res);
});

module.exports = Router;