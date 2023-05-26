const {DataTypes, Op} = require("sequelize");

const {db} = require('../server/database')

const sequelize = db.sequelize

exports.User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    credentialUuid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    paranoid: true,
    tableName: 'users',
    indexes: [
        {
            unique: true,
            fields: ['email'],
            where: {
                deletedAt: {[Op.not]: null},
            },
        },
        {
            unique: true,
            fields: ['phone'],
            where: {
                deletedAt: {[Op.not]: null},
            },
        },
    ],
})