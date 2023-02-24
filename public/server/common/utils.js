const { clone, coordEach } = require("@turf/turf");
const path = require("path");
const fs = require("fs");
const rootPath = path.join(__dirname, "..");
const { GEO_DATA_TYPES } = require("#server/common/constants.js");

exports.base64UrlEncode = (value) =>
  Buffer.from(value.toString()).toString("base64url");
exports.base64UrlDecode = (value) =>
  Buffer(value, "base64url").toString("ascii");
exports.hexToDec = (hex) => parseInt(hex, 16);
exports.decToHex = (dec) => dec.toString(16);

exports.featureToLeafletLatLng = (feature) => {
  const clonedFeature = clone(feature);
  coordEach(clonedFeature, (coords) => {
    const [x, y] = coords;
    coords.length = 0;
    coords[0] = y;
    coords[1] = x;
  });
  return clonedFeature;
};

exports.readData = () => {
  const locations = JSON.parse(
    fs.readFileSync(path.join(rootPath, "data", `locations.json`)).toString()
  ).features.map((feature) => {
    feature.properties.type = "location";
    return feature;
  });
  const regions = JSON.parse(
    fs.readFileSync(path.join(rootPath, "data", `regions.json`)).toString()
  ).features.map((feature) => {
    feature.properties.type = "region";
    return feature;
  });
  const creatures = JSON.parse(
    fs.readFileSync(path.join(rootPath, "data", `creatures.json`)).toString()
  ).features.map((feature) => {
    feature.properties.type = "creature";
    return feature;
  });
  return [...locations, ...regions, ...creatures];
};

// export.transformToLeafletLatLng = (features) => {

//     const collection = clone(featureCollection(features));

//     coordEach(collection, (coords) => {
//         const [x, y] = coords;
//         coords.length = 0;
//         coords[0] = y;
//         coords[1] = x;
//       });

//       return collection;
// };

// TODO
// exports.isDungeon = (position) => null;
