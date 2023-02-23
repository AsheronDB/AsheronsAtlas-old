const path = require("path");
const rootPath = path.join(__dirname, "..", "..");
const services = require(path.join(rootPath, "services"));

const turf = require("@turf/turf");
const { fstat } = require("fs");

const getLocationsFile = () => {
  return JSON.parse(fs.readFileSync("../../../data/locations.json").toString());
};

exports.locations_get = async function (req, res) {
  const db = await database;
  console.log("/locations query");

  console.log(req.query);
  const mobWcid = req.query.wcid || 7;

  //connection.connect();

  // let spawnData;

  //let weeniePropsDID;

  // let generatorFloats;

  // function getGenerators(generator, generators, encounters) {

  // }

  // try {

  //     let encounters = await pool.query('SELECT * FROM encounter');

  //     let generators = await pool.query('SELECT * FROM weenie_properties_generator');

  //     let mobGenerators = generators.filter(generator => generator.weenie_Class_Id == mob_weenie_id);

  // }

  //const sql = "SELECT * FROM weenie_properties_generator WHERE weenie_Class_Id = ?";

  const gensSql = `WITH RECURSIVE generator (object_Id, weenie_Class_Id) AS (
        SELECT e.object_Id, e.weenie_Class_Id
        FROM weenie_properties_generator e
        WHERE e.weenie_Class_Id = ?

        UNION
    
        SELECT e.object_Id, e.weenie_Class_Id
        FROM weenie_properties_generator e
        JOIN generator c ON c.object_Id = e.weenie_Class_Id
    )
    
    SELECT * FROM generator WHERE object_Id NOT IN (SELECT weenie_Class_Id FROM weenie_properties_generator)`;

  const encounterGensSql = `WITH RECURSIVE generator AS (
        SELECT e.*
        FROM weenie_properties_generator e
        WHERE e.object_Id = ?
     
        UNION ALL
    
        SELECT e.*
        FROM weenie_properties_generator e
        JOIN generator c ON c.weenie_class_Id = e.object_Id
    )
    
    SELECT * FROM generator`;

  // Pass 1: Query generators table with mob weenie ID
  // Pass 2: Results -- all generators that directly spawn that mob
  // Pass 3:

  try {
    const gensQuery = await db.all(gensSql, [mobWcid]);
    console.log(gensQuery);

    const genIds = gensQuery.map((gen) => gen.object_Id);

    const landblocksQuery = await db.all(
      `SELECT DISTINCT landblock FROM encounter WHERE weenie_Class_Id IN (${genIds.join(
        ", "
      )})`
    );
    const landblocks = landblocksQuery.map((encounter) =>
      encounter.landblock
        .toString(16)
        .padStart(4, "0")
        .padEnd(8, "0")
        .toUpperCase()
    );

    res.send(landblocks);
  } catch (err) {
    return console.error(err.message);
  } finally {
    res.end();
  }
};

// exports.locations_get = async function (req, res) {
//     console.log('GET LOCATIONS ROUTE...');

//     try {
//         const allLocations = await services.locations.getAllLocations();
//         res.json(allLocations);
//     } catch (error) {
//         res.send(404);
//     }
// };
