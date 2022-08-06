const errorhandler = async (err, req, res, next) => {
  return res
    .status(500)
    .json({ msg: `Something went wrong, kindly try again` });
};
module.exports = errorhandler;
