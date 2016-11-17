import { actions } from "./gameActions"

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

function goToHistory(step) {
  return {
    type: actions.GO_TO_HISTORY,
    step
  }
}

export default {
  startGame,
  resetGame,
  setGameCreated,
  setJoiningGame,
  selectTile,
  goToHistory
}
