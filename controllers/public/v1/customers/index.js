"use strict";

const express = require("express");
const router = express.Router();

const {asyncLocalStorage} = require('../../../../store/store')
const CustomerReadCoordinator = require('../../../../coordinators/customers/read');

const {get} = require("./get");
const {getAll} = require("./get_all");

router.get('/', getAll)

// resolve :customerId
router.use('/:customerId', async (req, res, next) => {
    if (!req.params.customerId) {
        return await next();
    }
    const customer = await CustomerReadCoordinator.default.get(req.params.customerId);
    const store = asyncLocalStorage.getStore();
    await asyncLocalStorage.run({...store, customer}, async () => {
        await next();
    });
});
router.get('/:customerId', get);

module.exports = router
