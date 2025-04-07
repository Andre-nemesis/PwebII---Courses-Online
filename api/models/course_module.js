'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Course_module = sequelize.define('Course_module', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    module_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Modules',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      }
    },
    course_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Courses',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
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
    sequelize,
    modelName: 'Course_module',
    tableName: 'Course_module',
    underscored: true,
  });

  return Course_module;
};