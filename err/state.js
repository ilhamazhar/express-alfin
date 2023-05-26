"use strict";
const {SystemError} = require("./common");

class StateError extends SystemError {
    constructor(msg, cause) {
        super(msg, cause);
        this.name = 'StateError';
    }
}

exports.StateError = StateError;
