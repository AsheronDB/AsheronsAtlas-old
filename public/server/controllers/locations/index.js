const path = require("path");
const rootPath = path.join(__dirname, "..", "..");
const services = require(path.join(rootPath, "services"));
const fs = require("fs");

const { globalToPos } = require("@asherondb/ac-position");

const { coordEach, featureCollection } = require("@turf/turf");

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

const DERETH_MAP_MAX_ZOOM = 11;
const DERETH_MAP_MIN_ZOOM = 0;

const LOCATION_CATEGORIES = {
  LIFESTONE: "lifestone",
  DUNGEON: "dungeon",
  VENDOR: "vendor",
  NPC: "npc",
  PORTAL: "portal",
  SETTLEMENT: "settlement",
  PLAYER_HOUSE: "player_house",
};

const LOCATION_SUBCATEGORIES = {
  MANSION: "mansion",
  COTTAGE: "cottage",
  VILLA: "villa",
};

const CATEGORY_ZOOM_LEVELS = {};

function getZoomCategories(zoom) {
  let categories = [];

  if (zoom >= 4 && zoom <= DERETH_MAP_MAX_ZOOM) {
    categories = [...categories, LOCATION_CATEGORIES.DUNGEON];
  }

  if (zoom >= 5 && zoom <= DERETH_MAP_MAX_ZOOM) {
    categories = [
      ...categories,
      LOCATION_CATEGORIES.LIFESTONE,
      LOCATION_CATEGORIES.PORTAL,
    ];
  }

  if (zoom >= 6 && zoom <= DERETH_MAP_MAX_ZOOM) {
    categories = [
      ...categories,
      LOCATION_CATEGORIES.VENDOR,
      LOCATION_CATEGORIES.NPC,
    ];
  }

  if (zoom >= 4 && zoom <= 7) {
    categories = [...categories, LOCATION_CATEGORIES.SETTLEMENT];
  }

  return categories;
}

// if (category == "lifestone") {
//   zoom = {
//     min: 5,
//     max: DERETH_MAP_MAX_ZOOM,
//   };
// } else if (category == "dungeon") {
//   zoom = {
//     min: 4,
//     max: DERETH_MAP_MAX_ZOOM,
//   };
// } else if (category == "vendor" || category == "npc") {
//   zoom = {
//     min: 6,
//     max: DERETH_MAP_MAX_ZOOM,
//   };
// } else if (category == "portal") {
//   zoom = {
//     min: 5,
//     max: DERETH_MAP_MAX_ZOOM,
//   };
// } else if (category == "house") {
//   if (subCategory == "mansion" || !location.properties.settlement) {
//     zoom = {
//       min: 4,
//       max: DERETH_MAP_MAX_ZOOM,
//     };
//   } else if (subCategory == "cottage" || subCategory == "villa") {
//     zoom = {
//       min: 8,
//       max: DERETH_MAP_MAX_ZOOM,
//     };
//   }
// } else if (category == "settlement") {
//   zoom = {
//     min: 4,
//     max: 7,
//   };
// } else {
//   zoom = {
//     min: DERETH_MAP_MIN_ZOOM,
//     max: DERETH_MAP_MAX_ZOOM,
//   };
// }

exports.locations_get = async function (req, res) {
  const validCategories = getZoomCategories(req.query.zoom);

  // southwest_lng,southwest_lat,northeast_lng,northeast_lat'
  const bbox = req.query.bbox.split(",");

  console.log(bbox);
  console.log(validCategories);

  const locationsData = getLocationsFile().features;

  const filteredData = locationsData
    .filter((location) => location.geometry.type == "Point")
    .filter((location) => {
      const x = location.geometry.coordinates[0];
      const y = location.geometry.coordinates[1];
      // && validCategories.includes(location.properties.category)

      // let x = value.geometry.coordinates[1];
      // let y = value.geometry.coordinates[0];

      // if (
      //   bboxCoordsTopLeft[0] <= x &&
      //   x <= bboxCoordsBotRight[0] &&
      //   bboxCoordsTopLeft[1] >= y &&
      //   y >= bboxCoordsBotRight[1] &&
      //   ((currentZoom >= value.properties.zoom.min &&
      //     currentZoom <= value.properties.zoom.max) ||
      //     value.properties.selected)
      // ) {

      if (
        x >= bbox[0] &&
        x <= bbox[2] &&
        y >= bbox[1] &&
        y <= bbox[3] &&
        validCategories.includes(location.properties.category)
      ) {
        return true;
      } else {
        return false;
      }
    });

  let collection = featureCollection(filteredData);

  coordEach(collection, (currentCoord) => {
    let newCoords = currentCoord;
    let [xMap, yMap] = newCoords;

    currentCoord.length = 0;
    currentCoord[0] = yMap;
    currentCoord[1] = xMap;
  });

  try {
    res.send(filteredData);
  } catch (err) {
    return console.error(err.message);
  } finally {
    res.end();
  }
};

exports.location_get = async function (req, res) {
  const locationId = req.params.id;

  const locationsData = getLocationsFile().features;
  const regionsData = getRegionsFile().features;

  const allLocations = [...locationsData, ...regionsData];

  const location = allLocations.find(
    (location) => location.properties.id === locationId
  );

  if (location.geometry.type == "Point") {
    const reverseGeocode = services.geocode.reverse(
      location.geometry.coordinates
    );

    location.properties.reverseGeocode = reverseGeocode;
    location.properties.position = globalToPos(
      location.geometry.coordinates[0],
      location.geometry.coordinates[1]
    );

    coordEach(location, (currentCoord) => {
        let newCoords = currentCoord;
        let [xMap, yMap] = newCoords;
    
        currentCoord.length = 0;
        currentCoord[0] = yMap;
        currentCoord[1] = xMap;
      });
      
  } else {
    // Figure out how to handle reverse geocoding for polygon regions here
  }

 

  try {
    res.send(location);
  } catch (err) {
    return console.error(err.message);
  } finally {
    res.end();
  }
};
