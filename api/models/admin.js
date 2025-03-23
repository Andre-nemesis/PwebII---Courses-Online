import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    role:{
      type: DataTypes.ENUM('admin', 'content_manager'),
      defaultValue: 'content_manager',
      allowNull: false,
    },
    user_id:{
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    created_at:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },{
    modelName:'Admin',
    underscored: true,
    tableName: 'admin',
  });

  Admin.associate = (models) => {
    Admin.belongsTo(models.Users, { foreignKey: 'user_id', as: 'User' });
    Admin.hasMany(models.Course, {foreignKey: 'admin_id', as: 'Author'});
  };

  return Admin;
};