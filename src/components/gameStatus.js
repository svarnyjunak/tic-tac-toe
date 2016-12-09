import React from "react"
import { calculateWinner } from "../utils/utils"

export default class GameStatus extends React.Component {
  render() {
    function getStatus(props) {
      const gameState = calculateWinner(props.squares);

      if(gameState) {
        if(props.isX && gameState.winner === "X") {
          return "You win!"
        }

        if(!props.isX && gameState.winner === "O") {
          return "You win!"
        }

        return "You lose!"
      }

      if(props.xIsNext === props.isX) {
        return "Your turn"
      }

      return "Oponent's turn";

    }

    return (
      <div>
        <div className="game-status">{getStatus(this.props)}</div>
      </div>
    );
  }
}

GameStatus.propTypes = {
  isX: React.PropTypes.bool.isRequired,
  xIsNext: React.PropTypes.bool.isRequired,
  squares: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};