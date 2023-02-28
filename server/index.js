const express = require("express");
const dotnev = require("dotenv");
const cors = require("cors");
const fs = require("fs");
// const DB = require("./Config/db");
const chatBotRoutes = require("./Routes/chatBotRoutes");
const userRoutes = require("./Routes/userRoutes");
const app = express();

dotnev.config();
console.log(process.env.PORT);
app.use(express.json());
app.use(cors());
app.use("/api/chatBot", chatBotRoutes);
app.use("/api/user", userRoutes);
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index.html");
});
// DB();
const port = process.env.PORT || 5000;
const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`)
);
