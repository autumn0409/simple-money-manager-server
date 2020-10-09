const db = require("../models");

const Category = db.category;

module.exports = {
  getCategories: async (req, res) => {
    try {
      const queryResult = await Category.findAll({
        attributes: ["name", "type"],
      });

      const incomeCategories = [];
      const expensesCategories = [];
      queryResult.forEach((row) => {
        if (row.type === "income") {
          incomeCategories.push(row.name);
        } else {
          expensesCategories.push(row.name);
        }
      });

      res.status(200).json({
        income: incomeCategories,
        expenses: expensesCategories,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createCategory: async (req, res) => {
    const { type, name } = req.query;

    try {
      const isNewCategory = await Category.findOrCreate({
        where: {
          type,
          name,
        },
      })[1];

      if (isNewCategory) {
        res.status(200).send("Create success");
      } else {
        res.status(200).send("Category already exist");
      }
    } catch (err) {
      res.status(400).send(err);
    }
  },

  deleteCategory: async (req, res) => {
    const { type, name } = req.query;

    try {
      await Category.destroy({
        where: {
          type,
          name,
        },
      });
      res.status(200).send("Delete success");
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
