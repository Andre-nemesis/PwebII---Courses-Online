'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Certificades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'student', 
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: id,
        },
        onUpdate: 'CASACADE',
        onDelete: 'CASCADE'
      },
      issue_date: {
        type: Sequelize.DATE
      },
      certificate_code: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM
      },
      final_score: {
        type: Sequelize.FLOAT
      },
      download_link: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Certificades');
  }
};