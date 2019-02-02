import React, { Component } from "react";
import ReactDOM from "react-dom";
import Keypad from "./component/keypad.jsx";
import ScoreBoard from "./component/scoreboard.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score1: [[], [], [], [], [], [], [], [], [], []],
      score2: [[], [], [], [], [], [], [], [], [], []],
      currFrame: 0
    };
    this.throwBall = this.throwBall.bind(this);
  }

  throwBall(pinNumber) {
    let currFrame = this.state.currFrame;
    let score1 = this.state.score1;
    if (
      currFrame < 10 &&
      (!score1[currFrame][0] ||
        (currFrame < 9 && score1[currFrame][0] + pinNumber < 11) ||
        currFrame === 9)
    ) {
      score1[currFrame].push(pinNumber);
      if (
        (currFrame < 9 && pinNumber === 10) ||
        (currFrame < 8 && score1[currFrame].length === 2) ||
        score1[currFrame].length === 3
      ) {
        currFrame++;
      }
      this.setState({ score1, currFrame });
    }
  }

  render() {
    return (
      <div>
        <Keypad onClick={this.throwBall} />
        <ScoreBoard score1={this.state.score1} score2={this.state.score2} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
