import { actions } from "./gameActions"

function createGame() {
  return {
    type: actions.CREATE_GAME,
  };
}

function joinGame(gameId) {
  return {
    type: actions.JOIN_GAME,
    gameId: gameId,
  };
}

function startGame(isX) {
  return {
    type: actions.START_GAME,
    isX
  };
}

function resetGame() {
  return {
    type: actions.RESET_GAME
  };
}

function setGameCreated(data) {
  return {
    type: actions.SET_GAME_CRATED,
    gameId: data.gameId
  };
}

function setJoiningGame() {
  return {
    type: actions.SET_JOINING_GAME
  }
}

function selectTile(tileIndex) {
  return {
    type: actions.SELECT_TILE,
    tileIndex
  }
}

function tileSelected(tileIndex) {
  return {
    type: actions.TILE_SELECTED,
    tileIndex
  }
}

function goToHistory(step) {
  return {
    type: actions.GO_TO_HISTORY,
    step
  }
}

export default {
  createGame,
  joinGame,
  startGame,
  resetGame,
  setGameCreated,
  setJoiningGame,
  selectTile,
  tileSelected,
  goToHistory
}
