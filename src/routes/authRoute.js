const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateForm } = require("../helper/validateForm");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 36000000),
    });

    res.json({ message: "SignUp successfully!!!", data: user });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
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
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.json({ message: "Login Successfully!!!", data: user });
    } else {
      throw new Error("Invalid Credentials password");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error: " + error);
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("Logout Successfully!!!");
});

module.exports = authRouter;
