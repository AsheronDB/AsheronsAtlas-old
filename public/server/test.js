let path = require("path");
let sqlite3 = require("sqlite3");
var cors = require("cors");
var bodyParser = require("body-parser");
let { open } = require("sqlite");

const fs = require("fs");

const { uniq } = require("lodash");

console.log(__dirname);
const ACE_DB_FILENAME = "ace_world.db";

console.log(dbPath);

const listToTree = (arr, rootId) => {
  let map = {},
    node,
    res = [],
    i;
  for (i = 0; i < arr.length; i += 1) {
    map[arr[i].data.generator.weenie_Class_Id] = i;
    arr[i].children = [];
  }
  for (i = 0; i < arr.length; i += 1) {
    node = arr[i];
    if (node.data.generator.object_Id !== rootId) {
      arr[map[node.data.generator.object_Id]].children.push(node);
    } else {
      res.push(node);
    }
  }
  return res;
};

function findPathsToLeaf(root, target, paths = [], path = [root.data]) {
  if (root.data.generator.weenie_Class_Id === target) {
    paths.push([...path]);
    return paths;
  }
  for (let child of root.children) {
    findPathsToLeaf(child, target, paths, [...path, child.data]);
  }
  return paths;
}

// var hygDb = new sqlite3.Database(staticPath + '/databases/' + HYG_DB_FILENAME);

(async () => {
  let aceWorldDb = await open({
    filename: dbPath + ACE_DB_FILENAME,
    driver: sqlite3.Database,
  });

  // hygDb.close();

  console.log("RUNNING");

  const mob_weenie_id = 7;

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
    const gensQuery = await aceWorldDb.all(gensSql, [mob_weenie_id]);
    // console.log(gensQuery);

    const genIds = gensQuery.map((gen) => gen.object_Id);

    // console.log(genIds);

    //const encounterSql = `SELECT DISTINCT landblock FROM encounter WHERE weenie_Class_Id IN (${genIds.join(', ')})`;

    const encounterQuery = await aceWorldDb.all(
      `SELECT weenie_Class_Id, landblock, cell_X, cell_Y FROM encounter WHERE weenie_Class_Id IN (${genIds.join(
        ", "
      )})`
    );

    let mobGeneratorChains = [];

    // All generators that have encounters

    const encounterGens = gensQuery
      .filter((generator) =>
        encounterQuery.some(
          (encounter) => generator.object_Id == encounter.weenie_Class_Id
        )
      )
      .map((generator) => {
        return {
          encounter: encounterQuery.find(
            (encounter) => generator.object_Id == encounter.weenie_Class_Id
          ),
          generator: Object.assign({}, generator),
        };
      });

    for (let i = 0; i < encounterGens.length; i++) {
      const encounterGen = encounterGens[i];

    //   console.log(encounterGen);
      //   console.log(encounterGen);
      const genQuery = await aceWorldDb.all(encounterGensSql, [
        encounterGen.encounter.weenie_Class_Id,
      ]);

      //   console.log(genQuery);

      const genList = uniq(genQuery.map((gen) => gen.object_Id));
      //   console.log(genList);

      //   console.log(genList);
      const radiusQuery = await aceWorldDb.all(
        `SELECT * FROM weenie_properties_float WHERE type = 43 AND object_Id IN (${genList.join(
          ", "
        )})`
      );

      let flatData = genQuery.map((gen) => {
        // console.log(gen);
        const data = {
          generator: Object.assign({}, gen),
        };
        const radius = radiusQuery.find(
          (row) => row.object_Id == gen.object_Id
        );
        if (radius) data.radius = radius.value;

        if (gen.object_Id == encounterGen.encounter.weenie_Class_Id)
          data.encounter = encounterGen.encounter;
        return {
          data: data,
          children: [],
        };
      });

      //   console.log(flatData);

      const treeData = listToTree(
        flatData,
        encounterGen.encounter.weenie_Class_Id
      );

   

      for (let i = 0; i < treeData.length; i++) {
        let paths = findPathsToLeaf(treeData[i], mob_weenie_id);

        if (paths.length > 0)
          mobGeneratorChains = [...mobGeneratorChains, ...paths];
        // console.log(paths);
      }

      // Build tree and everything

      console.log("-----------------------------");
    }

    fs.writeFileSync('./chains.json', JSON.stringify(mobGeneratorChains));












    
    // Query generators table for all weenies that start with

    const landblocksQuery = await aceWorldDb.all(
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
  } catch (err) {
    return console.error(err.message);
  } finally {
  }
})();
