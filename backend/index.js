const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const app = express();
const routes = require("./routes/Routes");
app.use(cors());
dotenv.config();
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", routes);

app.listen(5000, () => {
  console.log("Server is running");
});
