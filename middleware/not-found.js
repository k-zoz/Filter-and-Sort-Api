const notFound = async (req, res, next) => {
  res.status(404).send("Page not found");
  next();
};

module.exports = notFound;
