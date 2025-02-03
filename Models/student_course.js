'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student_course extends Model {
    static associate(models) {
      Student_course.belongsTo(models.Student, { foreignKey:'student_id'});
      Student_course.belongsTo(models.Course, { foreignKey: 'course_id'});
    }
  }
  Student_course.init({
    student_id: {
      type: DataTypes.UUID,
      allowNull:false,
      references: {
        model: models.Student,
        key: 'id'
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: models.Course,
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Student_course',
  });
  return Student_course;
};