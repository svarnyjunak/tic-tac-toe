import React from "react";
import Board from "../../src/components/board";
import { calculateWinner } from "../utils/utils"

export default class Game extends React.Component {
  handleTileSelected(tileIndex) {
    console.log(this.props.xIsNext);
    console.log(this.props.isX);
    console.log(this.props.xIsNext === this.props.isX);

    if (this.props.xIsNext === this.props.isX) {
      this.props.socket.emit("tile selected", tileIndex);
      this.props.actions.selectTile(tileIndex);
    }
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

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleTileSelected.bind(this)} />
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
  }
}
