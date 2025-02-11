'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.Module, { through : 'Course_module', foreignKey: 'course_id' });
      Course.hasMany(models.Student, { through: 'Student_courses', foreignKey: 'course_id' });
      Course.hasMany(models.Certificate, { foreignKey: "certificate_id" })

      Course.belongsTo(models.Administrator, { foreignKey: "admin_id"});
    }
  }
  Course.init({
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
    course_module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: model.Course_module,
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
    student_course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student_courses',
        key: 'id'
      }
    },
    admin_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'admnistrator',
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
    certificate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        references: {
          model: 'certificate',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};