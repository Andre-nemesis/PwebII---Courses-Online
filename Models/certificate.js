'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Certificate = sequelize.define('Certificate', {
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
        model: 'Student',
        key: 'id',
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Course',
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
      type: DataTypes.ENUM('Pendente', 'Aprovado', 'Rejeitado'),
      defaultValue: 'Pendente',
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
      allowNull: false
    },
    updated_at:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  });
  Certificate.associate = (models) => {
    Certificate.belongsTo(models.Student, {foreignKey:'student_id'});
    Certificate.belongsTo(models.Course, {foreignKey:'course_id'});
  }

  return Certificate;
};