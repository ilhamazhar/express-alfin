"use strict";

const {NotFoundError} = require('../../err/not_found')

class ReadCoordinator {
    model;
    dal;
    eagerLoadMapping;
    orderSet;
    baseWhereClause;

    constructor(model, dal, eagerLoad = [], order = [], baseWhereClause = {}) {
        this.model = model;
        this.dal = dal;
        this.eagerLoadMapping = new Map(eagerLoad.map((el) => [el.as, el]));
        this.orderSet = new Set(order);
        this.baseWhereClause = baseWhereClause;
    }

    async getPlain(id, parentTransaction) {
        const obj = await this.dal.get(id, {
            transaction: parentTransaction,
        });
        if (!obj) {
            throw new NotFoundError('cannot find ' + this.model.name + ' ' + id);
        }
        return obj;
    }

    async get(id, parentTransaction, paranoid = true) {
        const obj = await this.dal.get(id, {
            include: [...this.eagerLoadMapping.values()],
            transaction: parentTransaction,
            paranoid,
        });
        if (!obj) {
            throw new NotFoundError('cannot find ' + this.model.name + ' ' + id);
        }
        return obj;
    }

    async getAll(paginationParams = {limit: undefined, offset: 0}, parentTransaction) {
        return await this.dal.where({
            limit: paginationParams.limit,
            offset: paginationParams.offset,
            transaction: parentTransaction,
            order: this.orderSet.size ? [...this.orderSet] : [['createdAt', 'DESC']],
            include: [...this.eagerLoadMapping.values()],
        });
    }

    async first(whereClause = {}, {
        include = [...this.eagerLoadMapping.values()],
        order = [...this.orderSet],
        transaction,
    }) {
        const obj = await this.dal.first({
            where: {...this.baseWhereClause, ...whereClause},
            include,
            order,
            transaction,
        });
        if (!obj) {
            throw new NotFoundError('cannot find ' + this.model.name);
        }
        return obj;
    }

    async where(whereClause = {}, {
        attributes,
        include = [...this.eagerLoadMapping.values()],
        order = [...this.orderSet],
        pagination = {limit: undefined, offset: 0},
        transaction,
    }) {
        const objs = await this.dal.where({
            attributes,
            where: {...this.baseWhereClause, ...whereClause},
            include,
            order,
            transaction,
            // TODO: redo pagination to make use of seen-ids instead
            limit: pagination.limit || undefined,
            offset: pagination.offset || undefined,
        });
        if (!objs) {
            throw new NotFoundError('cannot find ' + this.model.name);
        }
        return objs;
    }

    async count(whereClause = {}, parentTransaction) {
        const cnt = await this.dal.count({
            distinct: true,
            col: 'id',
            where: {...this.baseWhereClause, ...whereClause},
            transaction: parentTransaction,
        });
        return cnt;
    }
}

exports.default = ReadCoordinator;
