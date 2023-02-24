const { readData } = require("#server/common/utils.js");
const { point, booleanPointInPolygon } = require("@turf/turf");

exports.reverse = (pointData) => {
  const regions = readData().filter(
    (feature) => feature.properties.type == "region"
  );

  return regions
    .filter((feature) => booleanPointInPolygon(point(pointData), feature))
    .map((feature) => feature.properties.name);
};
