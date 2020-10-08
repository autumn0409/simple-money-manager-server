module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      type: DataTypes.STRING,
      name: DataTypes.STRING,
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
