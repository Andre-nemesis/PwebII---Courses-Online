'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Teachers = sequelize.define('Teachers', {
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
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    }
  },
    {
      modelName:'Teachers',
      underscored: true,
      tableName: 'teachers'
    });

  Teachers.associate = (models) => {
    Teachers.hasMany(models.Module, { foreignKey: 'teacher_id', as: 'Modules'});
    Teachers.belongsTo(models.Users, { foreignKey: 'user_id', as:'User' });
  }

  return Teachers;
};