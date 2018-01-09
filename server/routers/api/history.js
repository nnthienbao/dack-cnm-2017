const express = require('express');
const Router = express.Router();

const historyController = require('../../controllers/historyController');

function loginRequired(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

Router.get('/recharge', loginRequired, (req, res) => {
    historyController.getRechargeHistory(req, res);
});

Router.get('/withdraw', loginRequired, (req, res) => {
    historyController.getWithdrawHistory(req, res);
});

module.exports = Router;