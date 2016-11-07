import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Board from "../../src/components/board.js";
import {resetGame, selectTile, goToHistory} from "../actions/gameActions"
import { calculateWinner } from "../utils/utils"

class Game extends React.Component {
  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    console.log(this.props.stepNumber);
    console.log(current);
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';

      return (
        <li key={history.indexOf(step)}>
          <a href="#" className={move === this.props.stepNumber ? "selectedItem" : ""} onClick={() => this.props.actions.goToHistory(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.props.actions.selectTile(i)} />
        </div>
        <div className="game-info">
          <button disabled={history.length === 1} onClick={() => this.props.actions.resetGame()}>Reset game</button>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext
  };
}

const actions = {resetGame, selectTile, goToHistory};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);