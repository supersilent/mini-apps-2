import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Line
          data={{
            labels: this.props.labels,
            datasets: [
              {
                fill: false,
                borderColor: "blue",
                label: "Bitcoin Historycal Price",
                data: this.props.data
              }
            ]
          }}
        />
      </div>
    );
  }
}
