"use strict";
const {StateError} = require('../err/state')

class BaseDAL {
    model;

    constructor(model) {
        this.model = model;
    }

    async create(values, options = {}) {
        return this.createAny(values, options);
    }

    async createAny(values, options = {}) {
        try {
            return await this.model.create(values, options);
        } catch (err) {
            throw err;
        }
    }

    async where(options = {}) {
        try {
            return await this.model.findAll(options);
        } catch (err) {
            throw err;
        }
    }

    async get(id, options = {}) {
        try {
            return await this.model.findByPk(id, options);
        } catch (err) {
            throw err;
        }
    }

    async first(options = {}) {
        try {
            return await this.model.findOne(options);
        } catch (err) {
            throw err;
        }
    }

    async update(obj, values, options = {}) {
        return this.updateAny(obj, values, options);
    }

    async updateAny(obj, values, options = {}) {
        if ('modifiable' in obj && !obj.modifiable) {
            throw new StateError('Object is on an unmodifiable status');
        }
        try {
            obj.set(values);
            const updatedObj = await obj.save(options);
            return updatedObj;
        } catch (err) {
            throw err;
        }
    }

    async delete(id, options = {}) {
        try {
            return await this.model.destroy({
                // @ts-ignore
                where: {id},
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async count(options = {}) {
        try {
            return await this.model.count(options);
        } catch (err) {
            throw err;
        }
    }
}

exports.BaseDAL = BaseDAL;
