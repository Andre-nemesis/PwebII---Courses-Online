'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "O nome do curso é obrigatório"
        },
        len: {
          args: [15, 100],
          msg: "O nome do curso deve ter entre 15 e 100 caracteres"
        }
      }
    },
    qtd_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "A quantidade de horas do curso deve ser maior ou igual a 1"
        }
      }
    },
    admin_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    percent_complet: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: 0,
          msg: "O percentual de completude do curso deve ser maior ou igual a 0"
        },
        max: {
          args: 100,
          msg: "O percentual de completude do curso deve ser menor ou igual a 100"
        }
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Course.associate = (models) => {
      Course.belongsToMany(models.Module, { through : 'Course_module', foreignKey: 'course_id' }); 
      Course.belongsToMany(models.Student, { through: 'Student_courses', foreignKey: 'course_id' });
      Course.hasMany(models.Certificate, { foreignKey: "course_id" })
      Course.belongsTo(models.Admin, { foreignKey: "admin_id"});
  }

  return Course;
};