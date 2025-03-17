'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Student_courses = sequelize.define('Student_courses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    student_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Students',
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
    modelName: 'Student_courses',
    tableName: 'Student_courses',
    underscored: true,
  });

  return Student_courses;
};