const express = require("express");
const router = express.Router();

const {
  getAllFurniture,
  getStaticfurniture,
} = require("../controllers/furnitures");

router.get("/", getAllFurniture);
router.get("/static", getStaticfurniture);

module.exports = router;
