'use strict';
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Module = sequelize.define('Module', {
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
        model: 'Teacher',
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
    }
  });

  Module.associate = (models) => {
    Module.belongsTo(models.Teachers, {foreignKey: 'teacher_id'});
    Module.belongsToMany(models.Course,{through : 'Course_module', foreignKey: 'module_id'});
  }
  
  return Module;
};