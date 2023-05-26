"use strict";

class UpdateCoordinator {
    model;
    dal;
    eagerLoad;

    constructor(model, dal, eagerLoad = [{all: true}]) {
        this.model = model;
        this.dal = dal;
        this.eagerLoad = eagerLoad;
    }

    async update(model, params, parentTransaction) {
        return await this.dal.update(model, params, {
            transaction: parentTransaction,
        });
    }
}

exports.default = UpdateCoordinator;
