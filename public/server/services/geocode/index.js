const path = require("path");
const fs = require("fs");
const rootPath = path.join(__dirname, "..", "..");

const { point, booleanPointInPolygon } = require("@turf/turf");

console.log(point);

const getRegionsFile = () => {
  return JSON.parse(
    fs.readFileSync(path.join(rootPath, "data", "regions.json")).toString()
  );
};

exports.reverse = function (pointData) {
  const regionsData = getRegionsFile().features;

  const pointFeature = point(pointData);

  const result = regionsData
    .filter((feature) => {
      return booleanPointInPolygon(pointFeature, feature);
    })
    .map((feature) => feature.properties.name);

  return result;
};
