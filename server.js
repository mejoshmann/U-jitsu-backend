const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1080;
require("dotenv").config();

app.use(cors());
app.use(express.json());

module.exports = app;

