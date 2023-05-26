"use strict";

class CreateCoordinator {
    model;
    dal;
    eagerLoad;

    constructor(model, dal, eagerLoad = [{all: true}]) {
        this.model = model;
        this.dal = dal;
        this.eagerLoad = eagerLoad;
    }

    async create(params, parentTransaction) {
        return this.dal.create(params, {
            transaction: parentTransaction,
        });
    }
}

exports.default = CreateCoordinator;
