const Statuses = require('../../../../lib/statuses')

const get = async (req, res, next) => {
    try {
        res.status(Statuses.default.OK).json({
            customer: 'Example response!'
        })
    } catch (err) {
        res.status(400).json({
            message: 'Failed.'
        });
    }
}
exports.get = get;
