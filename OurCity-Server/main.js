"use strict";

// const socketIO = require("socket.io");
const { db } = require("./db");
const app = require("./index");
const PORT = 1337;

// const server = require("http").createServer(app);
// const io = socketIO(server);

// io.on("connection", socket => {
//   console.log("a user connected :D");
//   socket.on("comment message", msg => {
//     console.log(msg);
//     io.emit("comment message", msg);
//   });
// });

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log("db synced");
    app.listen(process.env.PORT || PORT, () =>
      console.log(`studiously serving silly sounds on port ${PORT}`)
    );
  });
