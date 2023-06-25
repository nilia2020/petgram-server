const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const categoryRouter = require("./routes/categories");
const photoRouter = require("./routes/photos");

const { DBConnection } = require("./db/db");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

/* Rutas */
app.use("/", indexRouter);
app.use("/api/user", usersRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/photos", photoRouter);

DBConnection();

module.exports = app;
