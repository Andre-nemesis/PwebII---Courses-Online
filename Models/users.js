'use strict';

import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Nome não pode ser vazio.'
        },
        isAlpha: {
          args: true,
          msg: 'Nome deve conter apenas letras.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email não pode ser vazio.'
        },
        isEmail: {
          args: true,
          msg: 'Email inválido.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Senha não pode ser vazia.'
        },
        isLength: {
          args: [8, 20],
          msg: 'Senha deve ter entre 8 e 20 caracteres.'
        }
      }
    },
    type: {
      type: DataTypes.ENUM('admin', 'student', 'teacher'),
      defaultValue: 'student',
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'CPF não pode ser vazio.'
        },
        isNumeric: {
          args: true,
          msg: 'CPF deve conter apenas números.'
        },
        isLength: {
          args: [11],
          msg: 'CPF deve ter 11 dígitos.'
        },
        isCPF(value) {
          const cpfRegex = /^(?:[0-9]{3}\.?){3}[0-9]{2}$/;
          if (!cpfRegex.test(value)) {
            throw new Error('CPF inválido');
          }
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Número de telefone não pode ser vazio.'
        },
        isNumeric: {
          args: true,
          msg: 'Número de telefone deve conter apenas números.'
        },
        isPhoneNumber(value) {
          const phoneRegex = /^\+[1-9]\d{1,14}$/;
          if (!phoneRegex.test(value)) {
            throw new Error('Número de telefone inválido');
          }
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
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Teachers, { foreignKey: 'user_id'});
    Users.hasMany(models.Student, { foreignKey: 'user_id '});
    Users.hasMany(models.Admin, { foreignKey: 'user_id '});
  }

  hooks: {
    beforeCreate: async (users) => {
      if (users.password) {
        const salt = await bcrypt.genSalt(10);
        users.password = await bcrypt.hash(users.password, salt);
      }
    }
  }

  return Users;
};