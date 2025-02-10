'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Courses', 'course_module_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Course_module',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Course_module', 'course_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Courses', 'studant_course_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Student_courses',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Courses', 'certificate_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Certificates',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Courses', 'course_module_id');
    await queryInterface.removeColumn('Courses', 'studant_course_id');
    await queryInterface.removeColumn('Courses', 'certificate_id');
    await queryInterface.removeColumn('Course_module', 'course_id');
  }
};