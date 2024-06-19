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
    const { DataTypes } = Sequelize;
        await queryInterface.createTable("users", {
          id: {
            type: DataTypes.UUID,
            primaryKey: true,
          },
          firstName: {
              type: new DataTypes.STRING,
              allowNull: false,
          },
          middleName: {
              type: new DataTypes.STRING,
              allowNull: false,
              defaultValue: "",
          },
          lastName: {
              type: new DataTypes.STRING,
              allowNull: false,
          },
          email: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
          },
          gender: {
              type: DataTypes.STRING,
              allowNull: true,
              defaultValue: "unknown",
          },
          image: {
              type: DataTypes.STRING,
              allowNull: true,
          },
          lastActive: {
              type: DataTypes.DATEONLY,
          },
          password: {
              type: DataTypes.STRING,
              allowNull: false
          },
          accountType: {
              type: DataTypes.STRING,
              allowNull: false,
              defaultValue: "Subscriber",
          },
          phone: DataTypes.JSONB,
        })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
