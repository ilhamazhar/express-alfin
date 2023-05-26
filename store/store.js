"use strict";

const {AsyncLocalStorage} = require("async_hooks");
const asyncLocalStorage = new AsyncLocalStorage()
exports.asyncLocalStorage = asyncLocalStorage;

const asyncLocalStorageMiddleware = async (req, res, next) => {
    await asyncLocalStorage.run({url: req.originalUrl, method: req.method}, async () => {
        return await next();
    });
};
exports.asyncLocalStorageMiddleware = asyncLocalStorageMiddleware;