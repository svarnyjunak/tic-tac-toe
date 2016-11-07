import React from "react";

export default class Square extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className={this.props.causedTheWin ? "square causedTheWin" : "square"} onClick={() => this.props.onClick()} >
        {this.props.value}
      </button>
    );
  }
}   