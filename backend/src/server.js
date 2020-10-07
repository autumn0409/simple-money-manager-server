const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("666");
});

app.listen(port, () => {
  console.log(`Express app started on ${port}`);
});
