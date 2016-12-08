import assert from "assert"
import { calculateWinner } from "./utils"

/* global describe, it */
describe("utils", () => {
  describe("utils", () => {
    describe("#calculateWinner(squares)", () => {
      it("should return null when nobody wins", () => {
        assert.equal(null, calculateWinner(Array(9).fill({})));
      });

      const x = { value: "X" };
      const o = { value: "O" };
      const _ = {};

      describe("X has three from left to right", () => {
        const board = [ x, x, x,
                        _, _, _,
                        _, _, _ ];
        const result = calculateWinner(board);

        it("should retrun X when X has three from left to right", () => {
          assert.equal("X", result.winner);
        });

        it("should have line set to [0, 1, 2]", () => {
          assert.deepEqual([0, 1, 2], result.line);
        });
      });

      describe("O has three from top to down", () => {
        const board = [ o, _, _,
                        o, _, _,
                        o, _, _  ];
        const result = calculateWinner(board);

        it("should return O when O has three from top to down", () => {
          assert.equal("O", result.winner);
        });

        it("should have line set to [0, 3, 6]", () => {
          assert.deepEqual([0, 3, 6], result.line);
        });
      });

      describe("O has three on the diagonal", () => {
        const board = [ o, _, _,
                        _, o, _,
                        _, _, o  ];
        const result = calculateWinner(board);

        it("should have winner set to O", () => {
          assert.equal("O", result.winner);
        });

        it("should have line set to [0, 4, 8]", () => {
          assert.deepEqual([0,  4, 8], result.line);
        });
      });
    });
  });
});
