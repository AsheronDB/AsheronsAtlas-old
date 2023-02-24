const { globalToPos } = require("@asherondb/ac-position");
// const { locations, regions, creatures } = require("#server/config/data.js");
const { featureToLeafletLatLng, readData } = require("#server/common/utils.js");
const { geocoder } = require('#server/services/index.js');

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
  const allFeatures = readData();
  const locations = allFeatures.filter(
    (feature) =>
      feature.properties.type == "location" && feature.geometry.type == "Point"
  );

  let filteredLocations = locations;

  if (req.query.bbox) {
    const bbox = req.query.bbox.split(",");
    filteredLocations = filteredLocations.filter((location) => {
      const x = location.geometry.coordinates[0];
      const y = location.geometry.coordinates[1];
      return x >= bbox[0] && x <= bbox[2] && y >= bbox[1] && y <= bbox[3];
    });
  }

  if (req.query.zoom) {
    const validZoomCategories = getZoomCategories(req.query.zoom);
    filteredLocations = filteredLocations.filter((location) =>
      validZoomCategories.includes(location.properties.category)
    );
  }

  filteredLocations = filteredLocations.map((location) => {
    const reverseGeocode = geocoder.reverse(location.geometry.coordinates);
    if (reverseGeocode && reverseGeocode.length > 0)
      location.properties.reverseGeocode = reverseGeocode;

    location.properties.position = globalToPos(
      location.geometry.coordinates[0],
      location.geometry.coordinates[1]
    );

    return featureToLeafletLatLng(location);
  });

  try {
    res.send(filteredLocations);
  } catch (err) {
    return console.error(err.message);
  } finally {
    res.end();
  }
};

exports.location_get = async function (req, res) {
  const id = req.params.id;
  const allFeatures = readData();

  const location = allFeatures.find(
    (location) => location.properties.id === id
  );

  try {
    res.send(location);
  } catch (err) {
    return console.error(err.message);
  } finally {
    res.end();
  }
};
