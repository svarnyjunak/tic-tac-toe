const express = require("express");
const path = require("path");
const webpackDevHelper = require("./index.dev.js");
const events = require("./socketEvents");
const SocketConnector = require("./SocketConnector");

const app = express();

if (process.env.NODE_ENV !== "production") {
  console.log("DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...");
  webpackDevHelper.useWebpackMiddleware(app);
} else {
  console.log("PRODUCTION ENVIRONMENT");
}

app.get('/*', (req,res) => {
  res.sendfile(path.join(__dirname, 'public/index.html'))
});

const server = app.listen(4000, () => {
  console.log("App listening on port 4000")
});

const io = require("socket.io").listen(server);

const socketConnector = new SocketConnector();

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);

  socket.on(events.CREATE_GAME, () => {
    console.log("create game");
    const game = socketConnector.createGame(socket);
    socket.emit(events.GAME_CREATED, game.id);
  });

  socket.on(events.JOIN_GAME, (gameId) => {
    console.log("join game");
    socketConnector.joinGame(gameId, socket);

    const game = socketConnector.findGame(gameId);

    const invitedIsX = Math.random() >= 0.5;
    if (game.invited) {
      console.log("invited game started");
      game.invited.emit(events.GAME_STARTED, { gameId: game.id, isX: invitedIsX });
    }

    if (game.challenger) {
      console.log("challenger game started");
      game.challenger.emit(events.GAME_STARTED, { gameId: game.id, isX: !invitedIsX });
    }
  });

  socket.on(events.DISCONNECT, () => {
    socketConnector.removeSocket(socket);
    console.log("user disconnected");
  });

  socket.on("tile selected", (tileIndex) => {
    console.log("Selected new tile: " + tileIndex);
    io.emit("tile selected", tileIndex);
  });
});

