const db = require("../models");

const { category } = db;

module.exports = {
  getCategories: async (req, res) => {
    const { type } = req.query;

    try {
      const queryResult = await category.findAll({
        where: { type },
        attributes: ["name"],
      });
      const data = queryResult.map((row) => {
        return row.name;
      });
      res.status(200).json({ categories: data });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createCategory: async (req, res) => {
    const { type, name } = req.query;

    try {
      await category.create({
        type,
        name,
      });
      res.status(200).send("Create success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  deleteCategory: async (req, res) => {
    const { type, name } = req.query;

    try {
      await category.destroy({
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
