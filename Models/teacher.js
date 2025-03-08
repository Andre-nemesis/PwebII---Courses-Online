'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Teacher = sequelize.define('Teacher', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    academic_formation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Formação acadêmica não pode ser vazia.'
        }
      }
    },
    tecnic_especialization: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Especialidade técnica não pode ser vazia.'
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
  });

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Module, {foreignKey: 'teacher_id'});
    Teacher.belongsTo(models.User, { foreignKey: 'user_id' });
  }

  return Teacher;
};