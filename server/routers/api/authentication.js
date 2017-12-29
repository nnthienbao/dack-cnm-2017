var express = require('express');
var Router = express.Router();

var validateUser = require('../../common/validateUser');

Router.post('/register', function (req, res) {
    const { errors, isValid } = validateUser.validateUserRegister(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    return res.status(200).json({msg: "success"});
})

Router.post('/authenticate', function (req, res) {
    res.json({
        message: "Ban yeu cau authenticate"
    })
})

module.exports = Router;