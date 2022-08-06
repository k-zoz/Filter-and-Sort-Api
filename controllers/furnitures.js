const Furniture = require("../model/model");

const getStaticfurniture = async (req, res) => {
  const furniture = await Furniture.find({ price: { $gt: 90 } });
  res.status(200).json({ furniture, numOfHits: furniture.length });
};

const getAllFurniture = async (req, res) => {
  const { featured, company, country, name, sort, fields, numericFilters } =
    req.query;
  const furnitureObjects = {};

  if (featured) {
    furnitureObjects.featured = featured === "true" ? true : false;
  }

  if (company) {
    furnitureObjects.company = company;
  }

  if (country) {
    furnitureObjects.country = country;
  }

  if (name) {
    furnitureObjects.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const reGex = /\b(<|<=|=|>|>=)\b/g;

    let filters = numericFilters.replace(
      reGex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating", "points"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        furnitureObjects[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(furnitureObjects);

  let result = Furniture.find(furnitureObjects);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const furniture = await result;
  res.status(200).json({ furniture, numOfHits: furniture.length });
};

module.exports = { getAllFurniture, getStaticfurniture };
