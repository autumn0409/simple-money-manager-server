const db = require("../models");

const { category } = db;

const categoryService = {
  getCategories: async (type) => {
    try {
      const result = await category.findAll({
        where: { type },
        attributes: ["name"],
      });
      const data = result.map((row) => {
        return row.name;
      });
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  deleteCategory: async (type, name) => {
    await category.destroy({
      where: {
        type,
        name,
      },
    });
  },
};

module.exports = categoryService;
