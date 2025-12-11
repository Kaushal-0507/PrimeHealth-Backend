const express = require("express");

const app = express();

const userAuth = (req, res, next) => {
  const authorizedToken = "asd";
  const token = "asdc";
  if (authorizedToken !== token) {
    res.status(401).send("Unauthorized Access!!!");
  } else {
    next();
  }
};

module.exports = { userAuth };
