'use strict';

const { now } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Admin',{
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      role:{
        type: Sequelize.ENUM('admin','content_manager'),
        defaultValue: 'content_manager',
        allowNull: false
      },
      user_id:{
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
        allowNull: false
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW(),
      },
      updatedAt: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Admin');
  }
};
