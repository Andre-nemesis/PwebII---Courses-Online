'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    static associate(models) {
      Certificate.belongsTo(models.Student, {foreignKey:'student_id'});
      Certificate.belongsTo(models.Course, {foreignKey:'course_id'});
    }
  }
  Certificate.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    student_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: models.Student,
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
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    certificate_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM('pendente', 'aprovado', 'reprovado'),
      defaultValue: 'pendente',
      allowNull: false,
    },
    final_score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: {
          args: 0,
          msg: 'A pontuação minima é de 0',
        },
        max: {
          args: 100,
          msg: 'A pontuação máxima é de 100',
        }
      },
    },
    download_link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    created_at:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Certificate',
  });
  return Certificate;
};