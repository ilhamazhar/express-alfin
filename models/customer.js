const {DataTypes, Op} = require("sequelize");

const {db} = require('../server/database')

const sequelize = db.sequelize

exports.Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    data: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    paranoid: true,
    tableName: 'customers',
    indexes: [
        {
            unique: true,
            fields: ['userId'],
            where: {
                deletedAt: {[Op.not]: null},
            },
        },
    ],
})

// Associations
exports.Customer.prototype.associate = (models) => {
    exports.Customer.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'userId',
    });
};