"use strict";
const {QueryTypes} = require('sequelize');

const {BaseDAL} = require("./dal");
const {Customer} = require("../models/customer");

const {db} = require("../server/database");
const sequelize = db.sequelize;

class CustomerDAL extends BaseDAL {
    // Example dal
    async getAllCustomers(limit = 50) {
        try {
            const res = await sequelize.query(`
                select * from customers
                limit :limit
            `, {
                raw: true,
                plain: false,
                replacements: {
                    limit,
                },
                type: QueryTypes.SELECT
            })

            return res;
        } catch (err) {
            throw err;
        }
    }
}

const customerDAL = new CustomerDAL(Customer);
exports.default = customerDAL;
