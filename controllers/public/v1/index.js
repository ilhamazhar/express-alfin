"use strict";

const express = require('express');
const router = express.Router();

const customersRouter = require('./customers');

router.use('/customers', customersRouter);

module.exports = router