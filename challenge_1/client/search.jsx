import React, { Component } from "react";
import Axios from "axios";
import ReactPaginate from "react-paginate";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      result: [],
      offset: 0,
      pageCount: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {}

  async handleSubmit(event) {
    event.preventDefault();
    let result = await Axios.get(`events?q=${this.state.keyword}`);
    this.setState({ pageCount: Math.ceil(result.data.length / 10) });
    this.loadDataFromServer(1);
  }

  async loadDataFromServer(page) {
    let result = await Axios.get(
      `events?q=${this.state.keyword}&_page=${page}`
    );
    await this.setState({ result: result.data });
  }

  async handleInputChange(event) {
    await this.setState({ keyword: event.target.value });
  }

  date(str) {
    if (str[0] === "-") {
      return <h3>BC {str.slice(1)}</h3>;
    } else {
      return <h3>AD {str}</h3>;
    }
  }
  handlePageClick(data) {
    let selected = data.selected;
    this.setState({ offset: selected });
    this.loadDataFromServer(selected);
  }

  render() {
    let contents = this.state.result.map(content => {
      return (
        <div>
          {this.date(content.date)}
          <p>{content.description}</p>
        </div>
      );
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h3>Search from Historical Events</h3>
            <input
              name="search"
              type="string"
              value={this.state.keyword}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
        {contents}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
