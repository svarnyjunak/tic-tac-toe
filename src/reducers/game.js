import { RESET_GAME, SELECT_TILE, GO_TO_HISTORY } from "../actions/game"
import { calculateWinner } from "../utils/utils"

export default function game(state, action) {
    switch (action.type) {
        case RESET_GAME:
            return {
                history: [{
                    squares: Array(9).fill(null)
                }],
                stepNumber: 0,
                xIsNext: true
            };
        case SELECT_TILE:
            const history = state.history;
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            const isLastStep = history.length - 1 === state.stepNumber

            if (!isLastStep) {
                return state;
            }

            if (calculateWinner(squares) || squares[action.tileIndex]) {
                return state;
            }

            squares[action.tileIndex] = state.xIsNext ? 'X' : 'O';
            return {
                history: history.concat([{
                    squares: squares
                }]),
                stepNumber: ++state.stepNumber,
                xIsNext: !state.xIsNext,
            };
        case GO_TO_HISTORY:
            return Object.assign({}, state, {
                stepNumber: action.step,
                xIsNext: (action.step % 2) ? false : true,
            });

        default:
            return state
    }
}