require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

// express app
const app = express();
app.use(bodyParser.json());

// listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

// routers
require("./routes")(app);
