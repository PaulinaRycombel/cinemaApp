import React from "react";

const blue = "#0d47a1";
const red = "red";

class Seat extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      color: blue
    };
  }
  handleChange() {
    if (this.props.inactive) {
      return;
    }
    if (this.state.color === blue) {
      this.setState({ color: red });
    } else {
      this.setState({ color: blue });
    }

    this.props.onClick(this.props.row, this.props.col);
  }
  render() {
    return (
      <div
        key={`${this.props.row}-${this.props.col}`}
        className={`seats `}
        onClick={this.handleChange}
        style={{
          backgroundColor: ` ${this.props.inactive ? "gray" : this.state.color}`
        }}
      >{`${this.props.row}-${this.props.col}`}</div>
    );
  }
}

export default Seat;
