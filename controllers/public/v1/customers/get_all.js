const Statuses = require("../../../../lib/statuses");
const CustomerReadCoordinator = require('../../../../coordinators/customers/read');

const getAll = async (req, res, next) => {
    const {limit} = req.query;
    const paginationParams = {
        limit: limit ? Number(limit) : 50,
    };

    try {
        const customers = await CustomerReadCoordinator.default.getAll(paginationParams)
        res.status(Statuses.default.OK).json({
            customers
        })
    } catch (err) {
        console.error(err)
        res.status(400).json({
            message: err
        });
    }
}

exports.getAll = getAll;
