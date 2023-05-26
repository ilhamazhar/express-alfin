// Sort alphabetically
const {Customer} = require("../models/customer");
const {User} = require("../models/user");

const {db} = require('./database')
const sequelize = db.sequelize

// WARNING: DO NOT define models with prefix of "View_" in the list of models
// below. This is because views are generated manually in the database. When
// declared below with Model.sync, a table will be created for them, which is
// not intended.
exports.models = {
    Customer,
    User
}
const initModel = async (withoutSync = false) => {
    // Create model associations
    Object.keys(exports.models).forEach((modelKey) => {
        if ('associate' in exports.models[modelKey].prototype &&
            !Object.keys(exports.models[modelKey].associations).length) {
            exports.models[modelKey].prototype.associate(exports.models);
        }
    });
    if (!withoutSync) {
        await sequelize.sync();
    }
};
exports.initModel = initModel;
