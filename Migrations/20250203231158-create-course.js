'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      course_module_id: {
        type: Sequelize.INTEGER
      },
      qtd_hours: {
        type: Sequelize.INTEGER
      },
      student_course_id: {
        type: Sequelize.INTEGER
      },
      admin_id: {
        type: Sequelize.UUID
      },
      percent_complet: {
        type: Sequelize.FLOAT
      },
      certificate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
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
    await queryInterface.dropTable('Courses');
  }
};