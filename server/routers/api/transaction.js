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

Router.post('/request', loginRequired, (req, res) => {
    transactionController.requestCreateTransaction(req, res);
});

Router.get('/:ref', loginRequired, (req, res) => {
    transactionController.getInfoTransaction(req, res);
});

module.exports = Router;