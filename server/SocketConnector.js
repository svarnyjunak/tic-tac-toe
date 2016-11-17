const shortid = require("shortid");
const _ = require("lodash");

class SocketConnector {
  constructor() {
    this.games = {};
  }

  createGame(challenger) {
    const game = {
      id: shortid.generate(),
      challenger
    };

    this.games[game.id] = game;

    return game;
  }

  joinGame(gameId, invited) {
    const game = this.games[gameId];
    game.invited = invited;
  }

  findGame(gameId) {
    return this.games[gameId];
  }

  removeGame(gameId) {
    delete this.games[gameId];
  }

  removeSocket(socket) {
    const gamesArray = _.values(this.games);
    function getChallangedGames(id) {
      return gamesArray.filter(g => g.challenger && g.challenger.id === id);
    }

    function getInvitedGames(id) {
      return gamesArray.filter(g => g.invited && g.invited.id === id);
    }

    getChallangedGames(socket.id).map((g) => {
      g.challenger = null;
      return g;
    });

    getInvitedGames(socket.id).map((g) => {
      g.invited = null;
      return g;
    });
  }
}

module.exports = SocketConnector;
