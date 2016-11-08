import assert from "assert"
import { calculateWinner } from "./utils"

/* global describe, it */
describe("utils", () => {
  describe("utils", () => {
    describe("#calculateWinner(squares)", () => {
      it("should return null when nobody wins", () => {
        assert.equal(null, calculateWinner(Array(9).fill(null)));
      });

      it("should retrun X when X has three from left to right", () => {
        const board = [
          "X", "X", "X",
          null, null, null,
          null, null, null];

        assert.equal("X", calculateWinner(board));
      });

      it("should return O when O has three from top to down", () => {
        const board = [
          "O", null, null,
          "O", null, null,
          "O", null, null];

        assert.equal("O", calculateWinner(board));
      });

      it("should return O when O has three on the diagonal", () => {
        const board = [
          "O", null, null,
          null, "O", null,
          null, null, "O"];

        assert.equal("O", calculateWinner(board));
      });
    });
  });
});
