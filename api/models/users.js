'use strict';

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
        isCPF(value) {
          const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
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
        isPhoneNumber(value) {
          const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
          if (!phoneRegex.test(value)) {
            throw new Error('Número de telefone inválido. O formato deve ser: (99) 99999-9999');
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
  }, {
    sequelize,
    timestamps: true,
    underscored: true
  });

  Users.associate = (models) => {
    Users.hasMany(models.Teachers, { foreignKey: 'user_id', as: 'Teacher' });
    Users.hasOne(models.Student, { foreignKey: 'user_id', as: 'Student' });
    Users.hasMany(models.Admin, { foreignKey: 'user_id', as: 'Admin' });
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