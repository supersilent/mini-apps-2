import React, { Component } from "react";
import { Form, Button, Input, InputGroup } from "reactstrap";

export default class FormCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  handleChange(event) {
    this.setState({ value: event.target.value }, () => {});
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.state.value)}>
        <InputGroup size="sm">
          <Input />
        </InputGroup>
        <Button onChange={this.handleChange.bind(this)} />
      </Form>
    );
  }
}
