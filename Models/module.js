'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    static associate(models) {
      Module.belongsTo(models.Teacher, {foreignKey: 'teacher_id'});
      Module.belongsToMany(models.Course,{through : 'Course_module', foreignKey: 'module_id'})
    }
  }
  Module.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nome do módulo é obrigatório"
        },
        len: {
          args: [5, 255],
          msg: "Nome do módulo deve ter entre 5 e 255 caracteres"
        }
      }
    },
    teacher_id: {
      type: DataTypes.UUID,
      references: {
        model: models.Teacher,
        key: 'id'
      }
    },
    qtd_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [1],
          msg: "A quantidade de horas deve ser pelo menos 1"
        }
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Module',
  });
  return Module;
};