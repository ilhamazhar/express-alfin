"use strict";
const {SystemError} = require("./common");

class NotFoundError extends SystemError {
    constructor(msg, cause) {
        super(msg, cause);
        this.name = 'NotFoundError';
    }
}

exports.NotFoundError = NotFoundError;

exports.GenericNotFoundError = new NotFoundError('resource not found')
