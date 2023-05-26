"use strict";

class SystemError extends Error {
    constructor(msg, cause) {
        super(msg);
        if (cause) {
            this.stack = cause.stack;
        }
    }
}

exports.SystemError = SystemError;
