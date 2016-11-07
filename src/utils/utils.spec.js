import {calculateWinner} from "./utils"
import assert from "assert"

describe("utils", function() {
  describe("#calculateWinner(squares)", function() {
    it("should return null when nobody wins", function() {
      assert.equal(null, calculateWinner(Array(9).fill(null)));
    });

    it("should retrun x when x has three from left to right", function() {
      var board = ["x", "x", "x", 
                   null, null, null, 
                   null, null, null];
                   
      assert.equal("x", calculateWinner(board));
    });
    
    it("should return o when o has three from top to down", function() {
      var board = ["o", null, null, 
                   "o", null, null, 
                   "o", null, null];

      assert.equal("o", calculateWinner(board));
    });

    it("should return o when o has three on the diagonal", function() {
      var board = ["o", null, null, 
                   null, "o", null, 
                   null, null, "o"];

      assert.equal("o", calculateWinner(board));
    });
  });
});