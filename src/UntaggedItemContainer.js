import React, { Component } from 'react';
import UntaggedItem from './UntaggedItem';

class UntaggedItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: null,
      score: 0,
      error: null
    };
  }
  componentDidMount() {
    this.setState({ error: null });
    fetch(`${process.env.REACT_APP_API_URL}/recognize/${this.props.filename}`)
      .then(info => this.setState(info))
      .catch(err => this.setState({ error: err.message }));
  }
  render() {
    return <UntaggedItem {...this.props} guess={this.state.guess} score={this.state.score} />;
  }
}

export default UntaggedItemContainer;
