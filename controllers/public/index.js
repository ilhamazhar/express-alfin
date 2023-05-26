"use strict";

const express = require('express');
const router = express.Router();

const Statuses = require('../../lib/statuses')
const v1Router = require('./v1')

router.get('/', async (ctx) => {
    ctx.response.status = Statuses.default.OK;
    ctx.response.body = '.';
});
router.get('/health', async (ctx) => {
    ctx.response.status = Statuses.default.OK;
    ctx.response.body = '.';
});
router.use('/public/v1', v1Router);

exports.default = router;
