const sequelize = require("sequelize");
const db = require("../models");

const Category = db.category;
const Record = db.record;

module.exports = {
  getChart: async (req, res) => {
    const { year, month, type } = req.query;

    try {
      // query records
      const records = await Record.findAll({
        attributes: ["amount", "category.name"],
        where: {
          [sequelize.Op.and]: [
            sequelize.where(sequelize.fn("YEAR", sequelize.col("date")), year),
            sequelize.where(
              sequelize.fn("MONTH", sequelize.col("date")),
              month
            ),
          ],
        },
        include: [{ model: Category, attributes: [], where: { type } }],
        raw: true,
      });

      const result = {};
      records.forEach((record) => {
        if (!(record.name in result)) {
          result[record.name] = record.amount;
        } else {
          result[record.name] += record.amount;
        }
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
