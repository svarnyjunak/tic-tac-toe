import React from "react"
import { calculateWinner } from "../utils/utils"

export default class GameStatus extends React.Component {
  render() {
    const gameState = calculateWinner(this.props.squares);
    const status = gameState ?  
                  "Winner: " + gameState.winner : 
                  "Next player: " + (this.props.xIsNext ? "X" : "O");

    return <div>{status}</div>;
  }
}

GameStatus.propTypes = {
  xIsNext: React.PropTypes.bool.isRequired,
  squares: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};