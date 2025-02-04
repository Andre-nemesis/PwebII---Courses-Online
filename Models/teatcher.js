'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Teatcher extends Model {
    static associate(models) {
      Teacher.belongsTo(models.Course, {foreignKey: 'teacher_id'});
    }
  }
  Teatcher.init({
    id:{
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
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
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
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Número de telefone não pode ser vazio.'
        },
        isNumeric: {
          args: true,
          msg: 'Número de telefone deve conter apenas números.'
        }
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'Data de criação inválida.'
        }
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Teatcher',
    hooks: {
      beforeCreate: async (teatcher) => {
        if (teatcher.password) {
          const salt = await bcrypt.genSalt(10);
          teatcher.password = await bcrypt.hash(teatcher.password, salt);
        }
      }
    }
  });
  return Teatcher;
};