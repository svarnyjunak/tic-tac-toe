export const RESET_GAME = "RESET_GAME"
export const SELECT_TILE = "SELECT_TILE"
export const GO_TO_HISTORY = "GO_TO_HISTORY"

export function resetGame() {
    return {
        type: RESET_GAME,
    };
}

export function selectTile(tileIndex) {
    return {
        type: SELECT_TILE,
        tileIndex: tileIndex
    }
}

export function goToHistory(step) {
    return {
        type: GO_TO_HISTORY,
        step: step
    }
}