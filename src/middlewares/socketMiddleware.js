import io from "socket.io-client";
import { actions } from "../actions/gameActions";
import actionCreators from "../actions/gameActionCreators";

let socket = null;

export function socketMiddleware() {
  return next => (action) => {
    const result = next(action);

    if (socket && action.type === actions.CREATE_GAME) {
      socket.emit("CREATE_GAME");
    }

    if (socket && action.type === actions.JOIN_GAME) {
      socket.emit("JOIN_GAME", action.gameId);
    }

    if (socket && action.type === actions.TILE_SELECTED) {
      socket.emit("tile selected", action.tileIndex);
    }

    return result;
  };
}

export default function(store) {
  socket = io("localhost:4000");

  socket.on("tile selected", (tileIndex) => {
    store.dispatch(actionCreators.selectTile(tileIndex));
  });

  socket.on("GAME_CREATED", (gameId) => {
    store.dispatch(actionCreators.setGameCreated({ gameId }));
  });

  socket.on("GAME_STARTED", (data) => {
    store.dispatch(actionCreators.startGame(data.isX));
  });
}
