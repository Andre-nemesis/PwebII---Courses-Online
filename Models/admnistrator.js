'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Admnistrator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
          msg: "Name must contain only alphanumeric characters."
        },
        len: {
          args: [3, 100],
          msg: "Name must be between 3 and 100 characters long."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "Password must be between 8 and 100 characters long."
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
    hook: {
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