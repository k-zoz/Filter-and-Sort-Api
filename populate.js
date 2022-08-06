require("dotenv").config();

const connectDB = require("./database/db");
const Furniture = require("./model/model");

const furnitureData = require("./populated.json");

const fillUp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Furniture.deleteMany();
    await Furniture.create(furnitureData);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

fillUp();
