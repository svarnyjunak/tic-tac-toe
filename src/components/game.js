import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Board from "../../src/components/board";
import actionCreators from "../actions/gameActionCreators"
import { calculateWinner } from "../utils/utils"

class Game extends React.Component {
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

  handleTileSelected(tileIndex) {
    console.log(this.props.xIsNext);
    console.log(this.props.isX);
    console.log(this.props.xIsNext === this.props.isX);

    if (this.props.xIsNext === this.props.isX) {
      this.props.socket.emit("tile selected", tileIndex);
      this.props.actions.selectTile(tileIndex);
    }
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
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.props.xIsNext ? "X" : "O");
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        "Move #" + move :
        "Game start";

      return (
        <li key={history.indexOf(step)}>
          <a href="#" className={move === this.props.stepNumber ? "selectedItem" : ""} onClick={() => this.props.actions.goToHistory(move)}>{desc}</a>
        </li>
      );
    });

    switch (this.props.gameState) {
    case "STARTED":
      return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={ this.handleTileSelected.bind(this) } />
        </div>
        <div className="game-info">
          <button disabled={history.length === 1} onClick={() => this.props.actions.resetGame()}>
            Reset game
          </button>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
      );
    case "MENU":
      return (
        <div>
          <button onClick={ this.handleCreateGame.bind(this) } >Create game</button>
          <button onClick={ this.handleJoiningGame.bind(this) } >Join game</button>
        </div>
      );
    case "WAITING FOR OPONENT":
      return (
        <div>
          <input type="text" readOnly="readonly" ref="input" onClick={ () => this.refs.input.select()} value={this.props.gameId} />
        </div>
      );
    case "JOINING GAME":
      return (
        <div>
          <input type="text" ref="gameId" />
          <button onClick={ this.handleJoinGame.bind(this) }>Join game</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
