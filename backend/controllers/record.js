const sequelize = require("sequelize");
const db = require("../models");

const Category = db.category;
const Record = db.record;

module.exports = {
  getRecords: async (req, res) => {
    let income = 0;
    let expenses = 0;
    const { month, year } = req.query;

    try {
      // query records
      const records = await Record.findAll({
        attributes: [
          "id",
          "paymentMethod",
          "remarks",
          "amount",
          "date",
          "category.type",
          "category.name",
        ],
        where: {
          [sequelize.Op.and]: [
            sequelize.where(sequelize.fn("YEAR", sequelize.col("date")), year),
            sequelize.where(
              sequelize.fn("MONTH", sequelize.col("date")),
              month
            ),
          ],
        },
        include: [{ model: Category, attributes: [] }],
        raw: true,
      });

      let dailyRecords = {};

      // process records one by one
      records.forEach((record) => {
        // get income and expenses of the record
        let recordExpenses = 0;
        let recordIncome = 0;

        if (record.type === "expenses") {
          recordExpenses = record.amount;
          expenses += recordExpenses;
        } else if (record.type === "income") {
          recordIncome = record.amount;
          income += recordIncome;
        }

        // create recordItem
        const { name, date, ...recordItem } = record;
        recordItem.category = name;
        recordItem.date = date.getTime();

        // insert recordItem into dailyRecords
        const dateOfRecord = record.date.getDate();
        if (!(dateOfRecord in dailyRecords)) {
          const dailyRecordObj = {
            income: recordIncome,
            expenses: recordExpenses,
            date: record.date.getTime(),
            recordItems: [recordItem],
          };
          dailyRecords[dateOfRecord] = dailyRecordObj;
        } else {
          dailyRecords[dateOfRecord].recordItems.push(recordItem);
          dailyRecords[dateOfRecord].income += recordIncome;
          dailyRecords[dateOfRecord].expenses += recordExpenses;
        }
      });

      // only keep values in dailyRecords
      dailyRecords = Object.keys(dailyRecords).map((date) => {
        return dailyRecords[date];
      });

      res.status(200).json({
        month,
        income,
        expenses,
        dailyRecords,
      });
    } catch (err) {
      res.status(400).send("Get Error");
    }
  },

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

    const getCategoryId = (type, name) => {
      return Category.findOne({
        where: {
          type,
          name,
        },
        raw: true,
      }).then((category) => {
        return category.id;
      });
    };

    try {
      const targetRecord = await Record.findOne({
        attributes: [
          "paymentMethod",
          "remarks",
          "amount",
          "date",
          "categoryId",
          "category.type",
          "category.name",
        ],
        where: { id },
        include: [{ model: Category, attributes: [] }],
        raw: true,
      });

      // check whether category is changed
      let categoryIdAfter = targetRecord.categoryId;
      if (targetRecord.type !== type || targetRecord.name !== category) {
        categoryIdAfter = await getCategoryId(type, category);
      }

      if (
        targetRecord.paymentMethod !== paymentMethod ||
        targetRecord.remarks !== remarks ||
        targetRecord.amount !== amount ||
        targetRecord.date.getTime() !== new Date(date).getTime() ||
        categoryIdAfter !== targetRecord.categoryId
      ) {
        await Record.update(
          {
            paymentMethod,
            remarks,
            amount,
            categoryId: categoryIdAfter,
            date,
          },
          {
            where: {
              id,
            },
          }
        );

        res.status(200).send("Edit success");
      } else {
        res.status(200).send("Record not modified");
      }
    } catch (err) {
      console.log(err);
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
