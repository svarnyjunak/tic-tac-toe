import assert from "assert"
import changeState from "./gameReducer"
import actionCreators from "../actions/gameActionCreators"

/* global describe, it */
describe("reducers", () => {
  describe("gameReducer", () => {
    function createStartedGameState() {
      const state = changeState({}, actionCreators.resetGame());
      const stateAfterStart = changeState(state, actionCreators.startGame(true));

      return stateAfterStart;
    }

    describe("START_GAME", () => {
      const state = changeState({}, actionCreators.resetGame());
      const stateAfterStart = changeState(state, actionCreators.startGame(true));

      it("should have set gameStarted to true", () => {
        assert.equal("STARTED", stateAfterStart.gameState);
      });

      it("should have isX set to true", () => {
        assert.equal(true, stateAfterStart.isX);
      });
    });

    describe("RESET_GAME", () => {
      it("should have history with one record", () => {
        const state = changeState({}, actionCreators.resetGame());
        assert.equal(1, state.history.length);
      });

      it("should have stepNumber equal to 0", () => {
        const state = changeState({}, actionCreators.resetGame());
        assert.equal(0, state.stepNumber);
      });

      it("should have xIsNext equal to true", () => {
        const state = changeState({}, actionCreators.resetGame());
        assert.equal(true, state.xIsNext);
      });

      it("should have gameState set to MENU", () => {
        const state = changeState({}, actionCreators.resetGame());
        assert.equal("MENU", state.gameState);
      });
    });

    describe("SET_GAME_CREATED", () => {
      const id = "id";
      const state = changeState({}, actionCreators.resetGame());
      const newState = changeState(state, actionCreators.setGameCreated({ gameId: id, isX: true }));

      it("should have gameId set to id", () => {
        assert.equal(id, newState.gameId);
      });

      it("should have gameState set to WAITING FOR OPONENT", () => {
        assert.equal("WAITING FOR OPONENT", newState.gameState);
      });
    });

    describe("SET_JOINING_GAME", () => {
      const state = changeState({}, actionCreators.resetGame());
      const newState = changeState(state, actionCreators.setJoiningGame());

      it("should have gameState set to JOINING GAME", () => {
        assert.equal("JOINING GAME", newState.gameState);
      });
    });

    describe("SELECT_TILE", () => {
      {
        const state = createStartedGameState();
        const newState = changeState(state, actionCreators.selectTile(4));

        it("should fill X in the center", () => {
          assert.equal("X", newState.history[1].squares[4]);
        });

        it("should add new step", () => {
          assert.equal(1, newState.stepNumber);
        });

        it("should change player", () => {
          assert.equal(false, newState.xIsNext);
        });
      }

      it("should be no change if tile is already filled", () => {
        const state = changeState({}, actionCreators.resetGame());
        const prevState = changeState(state, actionCreators.selectTile(4));
        const newState = changeState(prevState, actionCreators.selectTile(4));

        assert.equal(prevState, newState);
      });

      it("should be no change if history step is selected", () => {
        let state = changeState({}, actionCreators.resetGame());
        state = changeState(state, actionCreators.selectTile(4));
        const prevState = changeState(state, actionCreators.goToHistory(0));
        const newState = changeState(prevState, actionCreators.selectTile(0));

        assert.equal(prevState, newState);
      });

      it("should be no change if game is alread won", () => {
        const state = changeState({}, actionCreators.resetGame());
        state.history[0].squares = [
          "X", "X", "X",
          null, null, null,
          null, null, null
        ];

        const newState = changeState(state, actionCreators.selectTile(0));

        assert.equal(state, newState);
      });

      it("should be different instace of state", () => {
        const state = createStartedGameState();
        const newState = changeState(state, actionCreators.selectTile(0));
        assert.ok(state !== newState);
      });

      it("should add new record to history", () => {
        const state = createStartedGameState();
        const stateTileSelected = changeState(state, actionCreators.selectTile(0));

        const history1 = stateTileSelected.history[0].squares;
        const history2 = stateTileSelected.history[1].squares;

        assert.notStrictEqual(history1, history2);
      });
    });

    describe("GO_TO_HISTORY", () => {
      it("should change stepNumber", () => {
        const state = changeState({}, actionCreators.resetGame());
        const stateGameCreated = changeState(state, actionCreators.setGameCreated({ isX: true }));
        const stateTileSelected = changeState(stateGameCreated, actionCreators.selectTile(0));
        const newState = changeState(stateTileSelected, actionCreators.goToHistory(0));

        assert.equal(0, newState.stepNumber);
      });
    });
  });
});
