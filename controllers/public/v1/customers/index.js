"use strict";

const express = require("express");
const router = express.Router();

const {get} = require("./get");

router.get('/', get);

module.exports = router
