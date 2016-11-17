import { actions } from "../actions/gameActions"
import { calculateWinner } from "../utils/utils"

export default function game(state, action) {
  switch (action.type) {
  case actions.START_GAME:
    return startGame(state, action);
  case actions.RESET_GAME:
    return resetGame(state, action);
  case actions.SET_GAME_CRATED:
    return setGameCreated(state, action);
  case actions.SET_JOINING_GAME:
    return setJoiningGame(state, action);
  case actions.SELECT_TILE:
    return selectTile(state, action);
  case actions.GO_TO_HISTORY:
    return goToHistory(state, action);
  default:
    return state
  }
}

function startGame(state, action) {
  return Object.assign({}, state, {
    gameState: "STARTED",
    isX: action.isX
  });
}

function resetGame() {
  return {
    history: [{
      squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true,
    gameState: "MENU"
  };
}

function setGameCreated(state, action) {
  return Object.assign({}, state, { gameId: action.gameId, gameState: "WAITING FOR OPONENT" });
}

function setJoiningGame(state) {
  return Object.assign({}, state, { gameState: "JOINING GAME" });
}

function selectTile(state, action) {
  const history = state.history;
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  const isLastStep = history.length - 1 === state.stepNumber

  if (!isLastStep) {
    return state;
  }

  const isTileAlreadyFilled = squares[action.tileIndex];
  if (isTileAlreadyFilled) {
    return state;
  }

  if (calculateWinner(squares)) {
    return state;
  }

  squares[action.tileIndex] = state.xIsNext ? "X" : "O";
  const newState = {
    history: history.concat([{ squares }]),
    stepNumber: ++state.stepNumber,
    xIsNext: !state.xIsNext
  };
  return Object.assign({}, state, newState);
}

function goToHistory(state, action) {
  return Object.assign({}, state, {
    stepNumber: action.step,
    xIsNext: (action.step % 2)
  });
}
