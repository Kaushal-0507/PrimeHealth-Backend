require("dotenv").config();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateForm } = require("./helper/validateForm");
const { userAuth } = require("./middlewares/auth");
const { now } = require("mongoose");
const app = express();
const PORT = 7000;

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    validateForm(userData);

    const { firstName, lastName, email, phone, dob, gender, password } =
      userData;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      dob,
      gender,
      phone,
      password: hashPassword,
    });
    await user.save();

    res.send("User added successfully!!!");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const userData = req?.body;
    const { email, password } = userData;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user?.password);

    if (isValidPassword) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 36000000),
      });

      res.send("Login Successfully!!!");
    } else {
      throw new Error("Invalid Credentials password");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send("Welcome " + user.firstName);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
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
