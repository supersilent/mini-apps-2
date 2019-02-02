import React, { Component } from "react";
import { Button } from "reactstrap";

export default class Keypad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <KeypadButton number={1} onClick={this.props.onClick} />
        <KeypadButton number={2} onClick={this.props.onClick} />
        <KeypadButton number={3} onClick={this.props.onClick} />
        <br />
        <KeypadButton number={4} onClick={this.props.onClick} />
        <KeypadButton number={5} onClick={this.props.onClick} />
        <KeypadButton number={6} onClick={this.props.onClick} />
        <br />
        <KeypadButton number={7} onClick={this.props.onClick} />
        <KeypadButton number={8} onClick={this.props.onClick} />
        <KeypadButton number={9} onClick={this.props.onClick} />
        <br />
        <KeypadButton number={10} onClick={this.props.onClick} />
        <KeypadButton number={0} onClick={this.props.onClick} />
      </React.Fragment>
    );
  }
}

class KeypadButton extends Component {
  render() {
    return (
      <Button
        onClick={() => {
          this.props.onClick(this.props.number);
        }}
        style={{ backgroundColor: "silver" }}
      >
        {this.props.number}
      </Button>
    );
  }
}
