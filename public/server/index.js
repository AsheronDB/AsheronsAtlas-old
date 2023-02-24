const cors = require("cors");
const bodyParser = require("body-parser");
const SERVER_HOST = "127.0.0.1";
const SERVER_PORT = 0; // 0 to pick random available port -- 55436 for testing

(async () => {
  const express = require("express");
  const app = express();

  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  app.use(require("./routes"));

  const server = app.listen(SERVER_PORT, SERVER_HOST, () => {
    const currentPort = server.address().port;
    console.log(`Server started, listening on ${currentPort}`);
    process.send({
      status: "ready",
      port: currentPort,
    });
  });
})();
