"use strict";
const {NotFoundError} = require('../../err/not_found')

class DeleteCoordinator {
    model;
    dal;
    eagerLoad;

    constructor(model, dal, eagerLoad = [{all: true}]) {
        this.model = model;
        this.dal = dal;
        this.eagerLoad = eagerLoad;
    }

    async delete(model, parentTransaction) {
        const deleteCount = await this.dal.delete(model[this.model.primaryKeyAttribute], {
            transaction: parentTransaction,
        });
        if (!deleteCount) {
            throw new NotFoundError('Failed to delete ' + this.model.name);
        }
        return model;
    }

    async batchDeleteByIds(ids, parentTransaction) {
        const deleteCount = await this.dal.delete(ids, {
            transaction: parentTransaction,
        });
        if (!deleteCount) {
            throw new NotFoundError('Failed to delete ' + this.model.name);
        }
    }

    async batchDelete(models, parentTransaction) {
        return this.batchDeleteByIds(models.map((model) => model[this.model.primaryKeyAttribute]), parentTransaction);
    }
}

exports.default = DeleteCoordinator;
