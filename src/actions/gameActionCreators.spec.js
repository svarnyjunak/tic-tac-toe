import assert from "assert"
import actionCreators from "../actions/gameActionCreators"

/* global describe, it */
describe("actions", () => {
  describe("gameActions", () => {
    describe("createGame", () => {
      const action = actionCreators.createGame();
      it("should have type set to CREATE_GAME", () => {
        assert.equal("CREATE_GAME", action.type);
      });
    });

    describe("joinGame", () => {
      const id = "ID";
      const action = actionCreators.joinGame(id);
      it("should have type set to JOIN_GAME", () => {
        assert.equal("JOIN_GAME", action.type);
      });

      it("should have gameId set to ID", () => {
        assert.equal(id, action.gameId);
      });
    });

    describe("startGame", () => {
      const isX = true;
      const action = actionCreators.startGame(isX);

      it("should have type set to START_GAME", () => {
        assert.equal("START_GAME", action.type);
      });

      it("should have set action.isX", () => {
        assert.equal(isX, action.isX);
      });
    });

    describe("resetGame", () => {
      it("should have type set to RESET_GAME", () => {
        const action = actionCreators.resetGame();
        assert.equal("RESET_GAME", action.type);
      });
    });

    describe("setGameCreated", () => {
      const id = "id";
      const action = actionCreators.setGameCreated({ gameId: id });
      it("should have type set to GAME_CREATED", () => {
        assert.equal("SET_GAME_CREATED", action.type);
      });

      it("should have set action.gameId", () => {
        assert.equal(id, action.gameId);
      });
    });

    describe("setJoiningGame", () => {
      const action = actionCreators.setJoiningGame();
      it("should have type set to SET_JOINING_GAME", () => {
        assert.equal("SET_JOINING_GAME", action.type);
      });
    });

    describe("tileSelected", () => {
      const index = 1;
      const action = actionCreators.tileSelected(index);
      it("should have type set to TILE_SELECTED", () => {
        assert.equal("TILE_SELECTED", action.type);
      });

      it("should have tileIndex set to 1", () => {
        assert.equal(index, action.tileIndex);
      });
    });
  });
});
