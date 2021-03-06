const express = require("express");
const app = express();
const configureDB = require("./config/database");
const routes = require("./config/routes");
const cors = require("cors");
const server = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(server);
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 3040;

app.use(cors(process.env.PORT || "http://localhost:3000/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(dirname, 'client/build')));

//* Handles any requests that don't match the ones above
app.use("/", routes);

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(dirname + '/client/build/index.html'));
// });
configureDB();

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  const changeStream = mongoose.connection.collection("rooms").watch();

  changeStream.on("change", (change) => {
    io.sockets.emit(change.fullDocument.agendaOtp, change.fullDocument);
  });
});

server.listen(port, () => {
  console.log("port listening on ", port);
});
