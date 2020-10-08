/* eslint-disable no-param-reassign */
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define(
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
  Record.associate = (models) => {
    Record.belongsTo(models.category, { foreignKey: { allowNull: false } });
  };
  Record.beforeCreate((record) => {
    record.id = uuidv4();
  });
  return Record;
};
