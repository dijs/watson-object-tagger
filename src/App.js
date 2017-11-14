import React, { Component } from 'react';
import Carousel from './Carousel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filenames: [],
      labels: [],
      error: null
    };
  }
  update = () => {
    this.setState({ error: null });
    fetch(`${process.env.REACT_APP_API_URL}/untagged`)
      .then(res => res.json())
      .then(filenames => this.setState({ filenames }))
      .catch(err => this.setState({ error: err.message }));
    fetch(`${process.env.REACT_APP_API_URL}/labels`)
      .then(res => res.json())
      .then(labels => this.setState({ labels }))
      .catch(err => this.setState({ error: err.message }));
  }
  onLabel = (filename, label) => {
    this.setState({ error: null });
    fetch(`${process.env.REACT_APP_API_URL}/tag/${filename}/${label}`)
      .catch(err => this.setState({ error: err.message }));
  }
  onNegative = (filename) => {
    this.setState({ error: null });
    fetch(`${process.env.REACT_APP_API_URL}/negative/${filename}`)
      .catch(err => this.setState({ error: err.message }));
  }
  onAddLabel = (label) => {
    this.setState({ error: null });
    fetch(`${process.env.REACT_APP_API_URL}/add-label/${label}`)
      .then(() => fetch(`${process.env.REACT_APP_API_URL}/labels`))
      .then(res => res.json())
      .then(labels => this.setState({ labels }))
      .catch(err => this.setState({ error: err.message }));
  }
  componentDidMount() {
    this.update();
  }
  render() {
    return <Carousel
      filenames={this.state.filenames}
      labels={this.state.labels}
      error={this.state.error}
      onLabel={this.onLabel}
      onNegative={this.onNegative}
      onAddLabel={this.onAddLabel}
    />;
  }
}

export default App;
