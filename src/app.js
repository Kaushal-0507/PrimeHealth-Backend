require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = 7000;

app.post("/signup", async (req, res) => {
  const obj = {
    firstName: "Kaushal",
    lastName: "Kishore",
    age: 21,
    email: "kaushal@gmail.com",
    gender: "male",
  };

  const user = new User(obj);

  await user.save();
  res.send("User Added");
});

connectDB()
  .then(() => {
    console.log("Database is successfully connected!!!");
    app.listen(PORT, () => {
      console.log("The server is running on port 7000!");
    });
  })
  .catch(() => {
    console.log("Database failed to connect!!!");
  });
