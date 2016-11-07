import { RESET_GAME, SELECT_TILE, GO_TO_HISTORY } from "../actions/game"
import { calculateWinner } from "../utils/utils"

export default function game(state, action) {
    switch (action.type) {
        case RESET_GAME:
            return resetGame();        
        case SELECT_TILE:
            return selectTile(state, action);
        case GO_TO_HISTORY:
            return Object.assign({}, state, {
                stepNumber: action.step,
                xIsNext: (action.step % 2) ? false : true,
            });

        default:
            return state
    }
}

function resetGame() {
    return {
        history: [{
            squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true
    };
}

function selectTile(state, action) {
    const history = state.history;
    const current = history[history.length - 1];
    const squares = current.squares;
    const isLastStep = history.length - 1 === state.stepNumber

    if (!isLastStep) {
        return state;
    }

    const isTileAlreadyFilled = squares[action.tileIndex];
    if(isTileAlreadyFilled) {
        return state;
    }

    if (calculateWinner(squares)) {
        return state;
    }

    squares[action.tileIndex] = state.xIsNext ? 'X' : 'O';
    return {
            history: history.concat([{
            squares: squares
        }]),
        stepNumber: ++state.stepNumber,
        xIsNext: !state.xIsNext
    };
}