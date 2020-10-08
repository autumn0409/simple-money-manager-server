const db = require("../models");

const Category = db.category;
const Record = db.record;

module.exports = {
  getRecords: async (req, res) => {},

  createRecord: async (req, res) => {
    const { date, amount, type, category, paymentMethod, remarks } = req.body;

    try {
      const targetCategory = await Category.findOne({
        where: { type, name: category },
      });
      await Record.create({
        paymentMethod,
        remarks,
        amount,
        categoryId: targetCategory.id,
        date,
      });
      res.status(200).send("Create success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  editRecord: async (req, res) => {
    const {
      id,
      date,
      amount,
      type,
      category,
      paymentMethod,
      remarks,
    } = req.body;

    try {
      const targetCategory = await Category.findOne({
        where: { type, name: category },
      });
      await Record.update(
        {
          paymentMethod,
          remarks,
          amount,
          categoryId: targetCategory.id,
          date,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).send("Edit success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  deleteRecord: async (req, res) => {
    const { id } = req.params;

    try {
      await Record.destroy({
        where: {
          id,
        },
      });
      res.status(200).send("Delete success");
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
