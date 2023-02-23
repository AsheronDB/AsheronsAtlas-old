const { Document } = require("flexsearch");
const fs = require("fs");
const path = require("path");
const rootPath = path.join(__dirname, "..", "..");

const { globalToPos } = require("@asherondb/ac-position");

const getLocationsFile = () => {
  return JSON.parse(
    fs.readFileSync(path.join(rootPath, "data", "locations.json")).toString()
  );
};

const getRegionsFile = () => {
  return JSON.parse(
    fs.readFileSync(path.join(rootPath, "data", "regions-new-test.geo.json")).toString()
  );
};

exports.search_get = async function (req, res) {
  const searchQuery = req.query.q;

  const options = {};

  const index = new Document({
    document: {
      id: "id",
      index: ["name"],
    },
  });

  const allFeatures = [...getRegionsFile().features, ...getLocationsFile().features];

  const locationsData = allFeatures.map((feature) => ({
    id: feature.properties.id,
    name: feature.properties.name,
  }));

  for (let i = 0; i < locationsData.length; i++) {
    const location = locationsData[i];
    index.add(location);
  }

  const results = index.search(searchQuery, 5000);

  console.log(results);

  try {
    if (results.length > 0) {
      const resultLocations = allFeatures.filter((feature) =>
        results[0].result.includes(feature.properties.id)
      );


    resultLocations.forEach(location => {

        if (location.geometry.type == "Point") {
            location.properties.position = globalToPos(
                location.geometry.coordinates[0],
                location.geometry.coordinates[1]
              );

        }


    });



      res.send(resultLocations);
    } else {
      res.send([]);
    }
  } catch (err) {
    return console.error(err.message);
  } finally {
    res.end();
  }
};
