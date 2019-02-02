import React, { Component } from "react";
import { Table } from "reactstrap";

export default class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.rolls.bind(this);
    this.scores.bind(this);
  }
  rolls() {
    let scoreBoard1 = this.props.score1.map((score, index) => {
      if (index < 9) {
        return (
          <React.Fragment>
            <td>{score[0]}</td>
            <td>{score[1]}</td>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <td>{score[0]}</td>
            <td>{score[1]}</td>
            <td>{score[2]}</td>
          </React.Fragment>
        );
      }
    });

    return scoreBoard1;
  }

  scores() {
    let scoreBoard1 = [];
    for (let i = 0; i < this.props.score1.length; i++) {
      let score = this.props.score1[i][0];
      if (this.props.score1[i][1]) {
        score += this.props.score1[i][1];
      }
      if (this.props.score1[i][0] === 10) {
        if (i < 9 && this.props.score1[i + 1][0])
          score += this.props.score1[i + 1][0];
        if (i < 8 && this.props.score1[i + 1][0] === 10) {
          if (this.props.score1[i + 2][0]) score += this.props.score1[i + 2][0];
        } else {
          if (i < 9 && this.props.score1[i + 1][1])
            score += this.props.score1[i + 1][1];
        }
      }
      if (
        this.props.score1[i][0] !== 10 &&
        this.props.score1[i][0] + this.props.score1[i][1] === 10
      ) {
        score += this.props.score1[i + 1][0];
      }

      if (i === 9 && this.props.score1[9][2]) {
        score += this.props.score1[9][2];
      } else {
      }
      if (i === 9) {
        scoreBoard1.push(<td colspan="3">{isNaN(score) ? null : score}</td>);
      } else {
        scoreBoard1.push(<td colspan="2">{isNaN(score) ? null : score}</td>);
      }
    }
    return scoreBoard1;
  }

  render() {
    let header = [];
    for (let i = 0; i < 9; i++) {
      header.push(<th colspan="2">{i + 1}</th>);
    }
    header.push(<th colspan="3">10</th>);
    return (
      <div>
        <Table bordered>
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>
            <tr>{this.rolls()}</tr>
            <tr>{this.scores()}</tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
