module.exports = (sequelize, DataTypes) => {
  const record = sequelize.define(
    "record",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    }
  );
  record.associate = (models) => {
    record.belongsTo(models.category, { foreignKey: { allowNull: false } });
  };
  return record;
};
