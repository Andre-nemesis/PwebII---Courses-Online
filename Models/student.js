'use strict';

import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
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

  Student.associate = (models) => {
    Student.hasMany(models.Certificate, { foreignKey: "student_id" })
    Student.belongsToMany(models.Course, { through: 'Student_course', foreignKey: "student_id"})
    Student.belongsTo(models.Users, { foreignKey: "user_id" });
  }

  return Student;
};