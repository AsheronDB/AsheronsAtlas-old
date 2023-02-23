const path = require("path");
const fs = require("fs");

const rootPath = path.join(__dirname, "..", "..");

const QUERY_DIR = path.join(rootPath, "sql");
const DATA_PATH = path.join(rootPath, "data");

const constants = require(path.join(rootPath, "constants"));
const utils = require(path.join(rootPath, "utils"));


const ACPosition = require('@asherondb/ac-position');

const { point, featureCollection } = require("@turf/turf");

let locationTypes = Object.values(constants.LOCATION_TYPES);
let locationSqlFiles = locationTypes.map((type) => [
    type,
    fs.readFileSync(`${QUERY_DIR}/${type}.sql`).toString(),
]);

let dungeonLandblockIds = require(path.join(
    DATA_PATH,
    "dungeonLandblockIds.json"
));
let townLocations = require(path.join(DATA_PATH, "townLocations.json"));

let regions = require(path.join(
    DATA_PATH,
    "regions.json"
));

const db = require(path.join(rootPath, "config", "db"));
var PolyOffset = require("polygon-offset");

/*

SETTLEMENT PORTALS DONE:
Arwic
Cragstone
Holtburg
Crater Lake

Current: Glenden Wood

*/

const locations_data = {


}

let settlementPortals = [];

let settlementsLocs = JSON.parse(fs.readFileSync(path.join(rootPath, 'data', 'settlements.geo.json')));
let settlementsData = JSON.parse(fs.readFileSync(path.join(rootPath, 'data', 'settlementsData.json')));

let settlementHousingIds = settlementsData.reduce((accumulator, value) => {
    return [].concat(accumulator, value.children);
}, []);


function landblockToBlock(landblock) {
    return landblock.substring(0, 4);
}

function landblockToCell(landblock) {
    return landblock.substring(4);
}

exports.getAllLocations = async function () {
    return new Promise(async (resolve, reject) => {

        console.log(settlementHousingIds);

        // const locationsQueryConn = await pool.ACE_WORLD.getConnection();

        let locationQueries = locationSqlFiles.map((file) => {
            let args = null;

            switch (file[0]) {
                case constants.LOCATION_TYPES.VENDOR:
                case constants.LOCATION_TYPES.LIFESTONE:
                case constants.LOCATION_TYPES.NPC:
                case constants.LOCATION_TYPES.PORTAL:
                    args = dungeonLandblockIds;
                    break;
                case constants.LOCATION_TYPES.SETTLEMENT:
                    args = settlementWeenieIds;
                    break;
            }

            let argArray = args ? [args] : null;
            return locationsQueryConn.query(file[1], argArray);
        });

        let locationResults;

        try {
            await locationsQueryConn.beginTransaction();
            locationResults = await Promise.all(locationQueries);
            await locationsQueryConn.commit();
        } catch (error) {
            console.log(error);
            await locationsQueryConn.rollback();
            throw error;
        } finally {
            await locationsQueryConn.release();
        }

        // TODO: if (locationResults) -- Check for empty results here and exit

        // Flatten all query result arrays
        let locations = locationResults.reduce(function (a, b) {
            return a.concat(b[0]);
        }, []);

        // Process results by location type
        let features = locations.map((loc) => {
            let position = new ACPosition(loc.objCellId, loc.originX, loc.originY, loc.originZ);
            let globalPos = position.toGlobal();

            let feature = point([globalPos.x, globalPos.y, globalPos.z]);

            feature.properties.id = utils.base64UrlEncode(loc.guid);
            feature.properties.name = loc.name;
            feature.properties.icon = loc.icon;
            feature.properties.category = loc.category;
            feature.properties.weenieId = loc.wcid;

            feature.properties.location = {
                obj_cell_id: loc.objCellId,
                position: [loc.originX, loc.originY, loc.originZ]
            };
            
            feature.properties.indoors = position.cell >= 256;

            switch (loc.category) {
                case constants.LOCATION_TYPES.PORTAL:

                        // Fix this
                    const destACPosition = new ACPosition(loc.destObjCellId, loc.destOriginX, loc.destOriginY, loc.destOriginZ);
                    const destLandblock = destACPosition.landblockHex;
                    const destGlobalPos = destACPosition.toGlobal();

                    if (
                        dungeonLandblockIds.some((block) => {
                            return block !== "0007" && block == destLandblock;
                        })
                    ) {
                        // dungeon portal

                        feature.properties.name = loc.name
                            .trim()
                            .replace(/\b +Portal$/, "");
                        feature.properties.type = "dungeon";
                    } else {
                        // normal portal
                    }

                    feature.properties.destination = {
                        coordinates: [destGlobalPos.x, destGlobalPos.y, destGlobalPos.z],
                        outside: !dungeonLandblockIds.includes(destLandblock),
                    };

                    break;
                case constants.LOCATION_TYPES.VENDOR:
                    break;
                case constants.LOCATION_TYPES.SETTLEMENT_PORTAL_HUB:

                    feature.properties.raw_giud = loc.guid;
                    break;
                case constants.LOCATION_TYPES.HOUSE:
                    let houseType = constants.HOUSE_TYPES[loc.houseType];
                    let landblock = loc.objCellId;
                    let x = loc.originX;
                    let y = loc.originY;
                    let z = loc.originZ;

                    if (houseType == "mansion") {
                        landblock = loc.slumObjCellId;
                        x = loc.slumOriginX;
                        y = loc.slumOriginY;
                        z = loc.slumOriginZ;
                    }

                    position = new ACPosition(landblock, x, y, z);
                    globalPos = position.toGlobal();

                    let houseFeature = point([globalPos.x, globalPos.y, globalPos.z]);

                    //feature.properties.indoors = position.cell >= 256;

                    feature.geometry = houseFeature.geometry;

                    feature.properties.indoors = false;

                    feature.properties.sub_category = houseType;

                    let hasSettlement = settlementHousingIds.some(
                        (housingId) => housingId == loc.wcid
                    );

                    // console.log('has settlemenet')
                    // console.log(hasSettlement);

                    if (hasSettlement) {
                        feature.properties.settlement = true;
                    }

                    break;
            }

            return feature;
        });

        let towns = townLocations.map((loc) => {
            loc.properties.id = utils.base64UrlEncode(loc.properties.id);
            return loc;
        });

        let settlements = settlementsLocs.features.map((loc) => {
            loc.properties.id = utils.base64UrlEncode(loc.properties.settlementWcid);
            loc.properties.wcid = loc.properties.settlementWcid;
            loc.properties.icon = 100671873;
            return loc;
        });

        
        let allFeatures = featureCollection([...features, ...settlements, ...regions.features]);

        // TODO: Merge towns and regions here

        resolve(allFeatures);
    });
};
