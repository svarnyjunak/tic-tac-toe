import React from "react";

export default class Square extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <button className={this.props.square.causedTheWin ? "square causedTheWin" : "square"} onClick={() => this.props.onClick()} >
        {this.props.square.value}
      </button>
    );
  }
}

Square.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  square: React.PropTypes.shape({
    value: React.PropTypes.string,
    causedTheWin: React.PropTypes.bool
  }).isRequired
};