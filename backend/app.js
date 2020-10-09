require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

// routers
require("./routes")(app);
