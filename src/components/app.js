import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Game from "../../src/components/game.js"
import actionCreators from "../actions/gameActionCreators"

class App extends React.Component {
  componentDidMount() {
    const { socket, actions } = this.props;
    socket.on("tile selected", (tileIndex) => {
      actions.selectTile(tileIndex);
    });

    socket.on("GAME_CREATED", (gameId) => {
      actions.setGameCreated({ gameId });
    });

    socket.on("GAME_STARTED", (data) => {
      actions.startGame(data.isX);
    });
  }

  handleCreateGame() {
    this.props.socket.emit("CREATE_GAME");
    // this.props.actions.startGame();
  }

  handleJoiningGame() {
    this.props.actions.setJoiningGame();
  }

  handleJoinGame() {
    const gameId = this.refs.gameId.value;
    this.props.socket.emit("JOIN_GAME", gameId);
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
