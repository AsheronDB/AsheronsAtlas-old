let path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");

(async () => {
  console.log("I'M THE SERVER");

  const express = require("express");
  const app = express();

  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  app.use(cors());

  const port = 0; // 0 to pick random available port -- 55436

  const api = require("./routes");
  app.use(api);

  let server = app.listen(port, '127.0.0.1', () => {
    let currentPort = server.address().port;
    console.log(currentPort);
    process.send({
      status: "ready",
      port: currentPort,
    });
  });
})();
