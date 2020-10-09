const categoryRouter = require("./category");
const chartRouter = require("./chart");
const recordRouter = require("./record");

module.exports = (app) => {
  app.use("/api/category", categoryRouter);
  app.use("/api/chart", chartRouter);
  app.use("/api/record", recordRouter);
};
