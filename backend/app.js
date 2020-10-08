require("dotenv").config();
const express = require("express");

// express app
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

require("./routers")(app);
