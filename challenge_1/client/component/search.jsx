import React, { Component } from "react";
import Axios from "axios";
import ReactPaginate from "react-paginate";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      result: [],
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
    let result = await Axios.get(`events`, {
      params: {
        q: this.state.keyword,
        _page: page
      }
    });
    await this.setState({ result: result.data });
  }

  async handleInputChange(event) {
    await this.setState({ keyword: event.target.value });
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.loadDataFromServer(selected);
  }

  render() {
    let contents = this.state.result.map(content => {
      return (
        <div>
          {content.date[0] === "-" ? (
            <h3>B.C. {content.date.slice(1)}</h3>
          ) : (
            <h3>A.D. {content.date}</h3>
          )}
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
