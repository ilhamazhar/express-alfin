const express = require('express');
const {initDB, initMigration} = require("./database");
const {initModel} = require("./models");
const {initRouter} = require("../controllers");

const app = async (params = {disableInitRouter: false, disableInitCron: false}) => {
    await initDB();
    await initModel()
    await initMigration()

    var k = express()
    if (!params.disableInitRouter) {
        initRouter(k)
    }
    return k
}
exports.app = app;
