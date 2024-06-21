'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("users", "address", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("users", "state", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("users", "country", {
      type: Sequelize.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("users", "address");
    await queryInterface.removeColumn("users", "state");
    await queryInterface.removeColumn("users", "country");
  }
};
