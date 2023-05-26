const Statuses = require('../../../../lib/statuses')
const {asyncLocalStorage} = require('../../../../store/store')

const get = async (req, res, next) => {
    const customer = asyncLocalStorage.getStore().customer;
    try {
        res.status(Statuses.default.OK).json({
            customer
        })
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
}
exports.get = get;
