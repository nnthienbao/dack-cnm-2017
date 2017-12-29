const express = require('express');
const Router = express.Router();

const validateUser = require('../../common/validateUser');
const generateAddress = require('../../common/Utils').generateAddress;

Router.post('/register', function (req, res) {
    const { errors, isValid } = validateUser.validateUserRegister(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const address = generateAddress();
    return res.status(200).json(address);
})

Router.post('/authenticate', function (req, res) {
    res.json({
        message: "Ban yeu cau authenticate"
    })
})

module.exports = Router;