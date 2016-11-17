import assert from "assert";
import { expect } from "chai";
import SocketConnector from "./SocketConnector";

/* global describe, it */
/* eslint-disable no-unused-expressions */
describe("SocketConnector", () => {
  describe("constructor", () => {
    it("should create property games", () => {
      const connector = new SocketConnector();
      assert(connector.games);
    })
  });

  describe("createGame", () => {
    const connector = new SocketConnector();
    const socket = {};
    const game = connector.createGame(socket);

    it("should create unique game.id", () => {
      assert(game.id)
    });

    it("should add socket to game.challenger", () => {
      assert.strictEqual(socket, game.challenger);
    });

    it("should add game to connector.games", () => {
      assert.strictEqual(game, connector.games[game.id]);
    });
  })

  describe("joinGame", () => {
    const connector = new SocketConnector();
    const game = connector.createGame({});
    const socket = {};
    connector.joinGame(game.id, socket);

    it("should add invited to game.invited", () => {
      assert.strictEqual(socket, game.invited);
    });
  });

  describe("findGame", () => {
    const connector = new SocketConnector();
    const game = connector.createGame({});

    it("should find game", () => {
      assert.strictEqual(game, connector.findGame(game.id));
    });
  });

  describe("removeGame", () => {
    const connector = new SocketConnector();
    const game = connector.createGame();

    connector.removeGame(game.id);

    it("should remove game from connector", () => {
      expect(connector.games[game.id]).to.be.undefined;
    });
  });

  describe("removeSocket", () => {
    const connector = new SocketConnector();

    it("should remove socket of challanger from game", () => {
      const socketA = { id: 1 };
      const game = connector.createGame(socketA);
      connector.removeSocket(socketA);
      expect(game.challenger).to.be.null;
    });

    it("should remove socket of invited palyer from game", () => {
      const socketA = { id: 2 };
      const socketB = { id: 3 };
      const game = connector.createGame(socketA);
      connector.joinGame(game.id, socketB);

      connector.removeSocket(socketB);
      expect(game.invited).to.be.null;
    });
  });
});
