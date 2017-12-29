const express = require('express');
const Router = express.Router();

const validateUser = require('../../common/validateUser');
const userController = require("../../controllers/userController");

Router.post('/register', function (req, res) {
    validateUser.validateUserRegister(req.body)
        .then(function ({errors, isValid}) {
            if(!isValid) {
                return res.status(400).json(errors);
            }

            userController.createUser(req, res);
        });
});

Router.post('/authenticate', function (req, res) {
    res.json({
        message: "Ban yeu cau authenticate"
    })
});

module.exports = Router;