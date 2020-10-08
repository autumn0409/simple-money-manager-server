/* eslint-disable no-param-reassign */
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    }
  );
  Category.associate = (models) => {
    Category.hasMany(models.record, { foreignKey: { allowNull: false } });
  };
  Category.beforeCreate((category) => {
    category.id = uuidv4();
  });
  return Category;
};
