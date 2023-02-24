const { Document } = require("flexsearch");
const { readData } = require("#server/common/utils.js");

exports.search_get = async function (req, res) {
  const searchQuery = req.query.q;
  const options = {};

  const index = new Document({
    document: {
      id: "id",
      index: ["name"],
    },
  });

  const allFeatures = readData();

  for (let i = 0; i < allFeatures.length; i++) {
    const feature = allFeatures[i];
    index.add({
      id: feature.properties.id,
      name: feature.properties.name,
    });
  }

  const results = index.search(searchQuery, 10000);

  try {
    if (results.length > 0) {
      const resultFeatures = allFeatures.filter((feature) =>
        results[0].result.includes(feature.properties.id)
      );

      res.send(resultFeatures);
    } else {
      res.send([]);
    }
  } catch (err) {
    return console.error(err.message);
  } finally {
    res.end();
  }
};
