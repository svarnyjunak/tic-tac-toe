import {calculateWinner} from "./utils"
import assert from "assert"

describe("utils", function() {
  describe("utils", function() {
    describe("#calculateWinner(squares)", function() {
      it("should return null when nobody wins", function() {
        assert.equal(null, calculateWinner(Array(9).fill(null)));
      });

      it("should retrun X when X has three from left to right", function() {
        var board = ["X", "X", "X", 
                    null, null, null, 
                    null, null, null];

        assert.equal("X", calculateWinner(board));
      });
      
      it("should return O when O has three from top to down", function() {
        var board = ["O", null, null, 
                    "O", null, null, 
                    "O", null, null];

        assert.equal("O", calculateWinner(board));
      });

      it("should return O when O has three on the diagonal", function() {
        var board = ["O", null, null, 
                    null, "O", null, 
                    null, null, "O"];

        assert.equal("O", calculateWinner(board));
      });
    });
  });
});