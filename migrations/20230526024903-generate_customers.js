'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        const transaction = await queryInterface.sequelize.transaction()

        try {
            const usersRow = [];
            for (let i = 0; i < 10; i++) {
                usersRow.push({
                    id: i,
                })
            }

            // Create users (mock)
            await queryInterface.bulkInsert(
                'users',
                usersRow.map(({id}, idx) => ({
                    id,
                    credentialUuid: `${id}-${idx}`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }))
            )

            // Create customers data (mock)
            await queryInterface.bulkInsert(
                'customers',
                usersRow.map(({id}, idx) => ({
                    id,
                    userId: id,
                    name: `User ${id}`,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })),
                {
                    transaction,
                }
            )
            await transaction.commit()
        } catch (err) {
            console.log(err)
            await transaction.rollback()
            throw err
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
