'use strict';

const { Model } = require('sequelize');

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.hasMany(models.Certificate, { foreignKey: "student_id" })
      Student.belongsToMany(models.Course, { through: 'Student_course', foreignKey: "student_id"})
    }
  }
  Student.init({
    id:{
      type:DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    name:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isCPF(value) {
          const cpfRegex = /^(?:[0-9]{3}\.?){3}[0-9]{2}$/;
          if (!cpfRegex.test(value)) {
            throw new Error('CPF inválido');
          }
        }
      }
    },
    phone_number:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isPhoneNumber(value) {
          const phoneRegex = /^\+[1-9]\d{1,14}$/;
          if (!phoneRegex.test(value)) {
            throw new Error('Número de telefone inválido');
          }
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail(value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            throw new Error('Email inválido');
          }
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLength: {
          args: [8, 128],
          msg: 'A senha deve ter entre 8 e 128 caracteres'
        },
        isAlphanumeric: {
          msg: 'A senha deve conter letras e números'
        }
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: 'created_at'
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'Student',
    hooks: {
      beforeCreate: async (student) => {
        if(student.password) {
          const salt = await bcrypt.genSalt(10);
          student.password = await bcrypt.hash(student.password, salt);
        }
      }
    }
  });
  return Student;
};