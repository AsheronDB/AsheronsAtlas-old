const { geocoder } = require('#server/services/index.js');

exports.reverse_get = async function (req, res) {
  const result = geocoder.reverse(req.query.point.split(","));
  try {
    res.send(result);
  } catch (err) {
    return console.error(err.message);
  } finally {
    res.end();
  }
};
