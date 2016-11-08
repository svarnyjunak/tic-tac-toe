import assert from "assert"
import changeState from "./gameReducer"
import { resetGame, selectTile, goToHistory } from "../actions/gameActions"

/* global describe, it */
describe("reducers", () => {
  describe("gameReducer", () => {
    describe("RESET_GAME", () => {
      it("should return history with one record", () => {
        const state = changeState({}, resetGame());
        assert.equal(1, state.history.length);
      });

      it("should return stepNumber equal to 0", () => {
        const state = changeState({}, resetGame());
        assert.equal(0, state.stepNumber);
      });

      it("should return xIsNext equal to true", () => {
        const state = changeState({}, resetGame());
        assert.equal(true, state.xIsNext);
      });
    });

    describe("SELECT_TILE", () => {
      it("should fill X in the center", () => {
        const state = changeState({}, resetGame());
        const newState = changeState(state, selectTile(4));

        assert.equal("X", newState.history[1].squares[4]);
      });

      it("should add new step", () => {
        const state = changeState({}, resetGame());
        const newState = changeState(state, selectTile(4));

        assert.equal(1, newState.stepNumber);
      });

      it("should change player", () => {
        const state = changeState({}, resetGame());
        const newState = changeState(state, selectTile(4));

        assert.equal(false, newState.xIsNext);
      });

      it("should be no change if tile is already filled", () => {
        const state = changeState({}, resetGame());
        const prevState = changeState(state, selectTile(4));
        const newState = changeState(prevState, selectTile(4));

        assert.equal(prevState, newState);
      });

      it("should be no change if history step is selected", () => {
        let state = changeState({}, resetGame());
        state = changeState(state, selectTile(4));
        const prevState = changeState(state, goToHistory(0));
        const newState = changeState(prevState, selectTile(0));

        assert.equal(prevState, newState);
      });

      it("should be no change if game is alread won", () => {
        const state = changeState({}, resetGame());
        state.history[0].squares = [
          "X", "X", "X",
          null, null, null,
          null, null, null
        ];

        const newState = changeState(state, selectTile(0));

        assert.equal(state, newState);
      });

      it("should be different instace of state", () => {
        const state = changeState({}, resetGame());
        const newState = changeState(state, selectTile(0));
        assert.ok(state !== newState);
      });

      it("should add new record to history", () => {
        const state = changeState({}, resetGame());
        const newState = changeState(state, selectTile(0));

        const history1 = newState.history[0].squares;
        const history2 = newState.history[1].squares;

        assert.notStrictEqual(history1, history2);
      });
    });

    describe("GO_TO_HISTORY", () => {
      it("should change stepNumber", () => {
        let state = changeState({}, resetGame());
        state = changeState(state, selectTile(0));
        const newState = changeState(state, goToHistory(0));

        assert.equal(0, newState.stepNumber);
      });
    });
  });
});
