'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_module extends Model {
    static associate(models) {
      Course_module.hasMany(models.Module, { foreignKey: 'module_id' });
      Course_module.hasMany(models.Course, { foreignKey:'course_id' });
    }
  }
  Course_module.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: models.Module,
        key: 'id',
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: models.Course,
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Course_module',
  });
  return Course_module;
};