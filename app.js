require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./database/db");
const furnitureRoutes = require("./route/route");
const notFound = require("./middleware/not-found");
const errorhandler = require("./middleware/error-handler");

app.use(express.json());

app.get("/api/v1/cars", (req, res) => {
  res.status(200).json({ msg: `<h1> WELCOME HOME </h1>` });
});

app.use("/api/v1/furniture", furnitureRoutes);
app.use(notFound);
app.use(errorhandler);

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port} `));
  } catch (error) {
    console.log(error);
  }
};

startServer();
