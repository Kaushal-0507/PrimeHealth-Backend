const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("This is your server");
});

app.listen(7000, () => {
  console.log("The server is running on port 7000!");
});
