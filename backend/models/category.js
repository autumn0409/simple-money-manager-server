module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
    }
  );
  //   Category.associate = (models) => {
  //     Category.belongsToMany(models.Record);
  //   };
  return category;
};
