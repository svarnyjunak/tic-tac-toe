import assert from "assert"
import changeState from "./gameReducer"
import { resetGame, selectTile, goToHistory } from "../actions/gameActions"

describe("reducers", function() {
    describe("gameReducer", function() {
        describe("RESET_GAME", function() {
            it("should return history with one record", function() {
                let state = changeState({}, resetGame() );
                assert.equal(1, state.history.length); 
            });

            it("should return stepNumber equal to 0", function() {
                let state = changeState({}, resetGame() );
                assert.equal(0, state.stepNumber);
            });

            it("should return xIsNext equal to true", function() {
                let state = changeState({}, resetGame() );
                assert.equal(true, state.xIsNext);
            });
        });

        describe("SELECT_TILE", function() {
            it("should fill X in the center", function() {
                let state = changeState({}, resetGame());
                let newState = changeState(state, selectTile(4));

                assert.equal("X", newState.history[1].squares[4]);
            });

            it("should add new step", function() {
                let state = changeState({}, resetGame());
                let newState = changeState(state, selectTile(4));

                assert.equal(1, newState.stepNumber);
            });

            it("should change player", function() {
                let state = changeState({}, resetGame());
                let newState = changeState(state, selectTile(4));

                assert.equal(false, newState.xIsNext);
            });

            it("should be no change if tile is already filled", function() {
                let state = changeState({}, resetGame());
                let prevState = changeState(state, selectTile(4));
                let newState = changeState(prevState, selectTile(4));

                assert.equal(prevState, newState);                   
            });

            it("should be no change if history step is selected", function() {
                let state = changeState({}, resetGame());
                state = changeState(state, selectTile(4));
                let prevState = changeState(state, goToHistory(0));
                let newState = changeState(prevState, selectTile(0));

                assert.equal(prevState, newState);  
            });

            it("should be no change if game is alread won", function() {
                let state = changeState({}, resetGame());
                state.history[0].squares =  ["X", "X", "X", 
                                             null, null, null, 
                                             null, null, null];
                
                let newState = changeState(state, selectTile(0));

                assert.equal(state, newState);  
            });
        });

        describe("GO_TO_HISTORY", function() {
            it("should change stepNumber", function() {
                let state = changeState({}, resetGame());
                state = changeState(state, selectTile(0));
                let newState = changeState(state, goToHistory(0));

                assert.equal(0, newState.stepNumber);
            });
        });
    });
});