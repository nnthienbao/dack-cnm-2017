const express = require('express');
const Router = express.Router();

const transactionController = require('../../controllers/transactionController');

function loginRequired(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

Router.post('/', loginRequired, (req, res) => {
    transactionController.createTransaction(req, res);
});

module.exports = Router;