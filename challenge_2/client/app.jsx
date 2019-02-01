import ReactDOM from "react-dom";
import React, { Component } from "react";
import Axios from "axios";
import Chart from "./component/chart.jsx";
import { Button } from "reactstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { labels: null, data: null, symbol: "btc", live: false };
    this.getChart = this.getChart.bind(this);
  }
  componentDidMount() {
    this.getChart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.live && !prevState.live) {
      this.getChart();
    }
  }

  getChart() {
    Axios("/price", {
      params: {
        symbol: this.state.symbol,
        live: this.state.live
      }
    })
      .then(res => {
        this.setState({
          labels: Object.keys(res.data),
          data: Object.values(res.data)
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Chart data={this.state.data} labels={this.state.labels} />
        {this.state.live ? (
          <Button
            onClick={() => this.setState({ live: false })}
            color="danger"
            size="lg"
          >
            live on
          </Button>
        ) : (
          <Button
            onClick={() => this.setState({ live: true })}
            size="lg"
            color="primary"
          >
            live off
          </Button>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
