"use strict";

const {BaseDAL} = require("./dal");
const {User} = require("../models/user");

const {db} = require("../server/database");
const sequelize = db.sequelize;

class UserDAL extends BaseDAL {
}

const userDAL = new UserDAL(User);
exports.default = userDAL;
