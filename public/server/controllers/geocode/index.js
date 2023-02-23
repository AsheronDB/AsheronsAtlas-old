const path = require("path");
const rootPath = path.join(__dirname, "..", "..");
const services = require(path.join(rootPath, "services"));
const fs = require("fs");



exports.reverse_get = async function (req, res) {
  const result = services.geocode.reverse(req.query.point.split(","));
  try {
    res.send(result);
  } catch (err) {
    return console.error(err.message);
  } finally {
    res.end();
  }
};
