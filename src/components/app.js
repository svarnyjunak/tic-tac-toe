import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Game from "../../src/components/game.js"
import actionCreators from "../actions/gameActionCreators"

class App extends React.Component {
  handleCreateGame() {
    this.props.actions.createGame();
  }

  handleJoiningGame() {
    this.props.actions.setJoiningGame();
  }

  handleJoinGame() {
    const gameId = this.refs.gameId.value;
    this.props.actions.joinGame(gameId);
  }

  render() {
    switch (this.props.gameState) {
      case "STARTED":
        return <Game {...this.props} />
      case "MENU":
        return (
          <div>
            <button onClick={this.handleCreateGame.bind(this)} >Create game</button>
            <button onClick={this.handleJoiningGame.bind(this)} >Join game</button>
          </div>
        );
      case "WAITING FOR OPONENT":
        return (
          <div>
            <input type="text" readOnly="readonly" ref="input" onClick={() => this.refs.input.select()} value={this.props.gameId} />
          </div>
        );
      case "JOINING GAME":
        return (
          <div>
            <input type="text" ref="gameId" />
            <button onClick={this.handleJoinGame.bind(this)}>Join game</button>
          </div>
        )
      default:
        return (<div></div>);
    }
  }
}

function mapStateToProps(state) {
  return {
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
    isX: state.isX,
    gameState: state.gameState,
    gameId: state.gameId
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
