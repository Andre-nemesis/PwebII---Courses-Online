'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Admnistrator extends Model {
    static associate(models) {
           Admnistrator.hasMany(models.Course, {
        foreignKey: 'admin_id', 
        as: 'courses' 
      });
    }
  }
  Admnistrator.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "O nome deve ser alfanumérico."
        },
        len: {
          args: [3, 100],
          msg: "O nome deve ter entre 3 e 100 caracteres."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "A senha deve ter entre 8 e 100 caracteres."
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
  }, {
    sequelize,
    modelName: 'Admnistrator',
    hooks: { 
      beforeCreate: async (admnistrator) => {
        if (admnistrator.password) {
          const salt = await bcrypt.genSalt(10);
          admnistrator.password = await bcrypt.hash(admnistrator.password, salt);
        }
      }
    }
  });
  return Admnistrator;
};