'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", 
      {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING,
            defaultValue: "",
        },
        lastName: {
            type: DataTypes.STRING,
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
            type: DataTypes.DATEONLY
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmPassword: {
            type: DataTypes.STRING,
            allowNull: false
          },
        accountType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Subscriber",
        },
        phone: DataTypes.JSONB,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        token: DataTypes.STRING,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
