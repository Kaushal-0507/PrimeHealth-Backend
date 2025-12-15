require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const { connectDB } = require("./config/database");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const app = express();
const PORT = 7000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", authRouter);

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
