const BaseCoordinator = require('../base/read');
const CustomerDAL = require('../../dal/customer');
const {Customer} = require('../../models/customer');
const {User} = require('../../models/user');

class ReadCoordinator extends BaseCoordinator.default {
    async getByUserId(id, parentTransaction) {
        return this.first({userId: id}, {
            transaction: parentTransaction,
        });
    }
}

exports.ReadCoordinator = ReadCoordinator;

const readCoordinator = new ReadCoordinator(Customer, CustomerDAL.default, [
    {
        model: User,
        as: 'User',
        required: true,
    },
])

exports.default = readCoordinator;
