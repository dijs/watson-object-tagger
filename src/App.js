import React, { Component } from 'react';
import UntaggedItem from './UntaggedItem';
import debug from 'debug';
import './App.css';

const log = debug('Watson-Object-Tagger:App');

function preloadImage(src) {
  const nextImage = new Image(353, 265);
  log('Preloading', src);
  nextImage.src = `${process.env.REACT_APP_API_URL}/untagged/${src}`;
  nextImage.onload = () => log('Preloaded', src);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filenames: [],
      labels: [],
      error: null,
      currentFileIndex: 0
    };
  }
  init = () => {
    this.setState({ error: null });
    fetch(`${process.env.REACT_APP_API_URL}/untagged`)
      .then(res => res.json())
      .then(filenames => this.setState({ filenames }))
      .then(() => {
        preloadImage(this.state.filenames[1]);
        preloadImage(this.state.filenames[2]);
        preloadImage(this.state.filenames[3]);
        return fetch(`${process.env.REACT_APP_API_URL}/recognize/${this.state.filenames[0]}`)
          .then(res => res.json())
          .then(({ guess, score }) => this.setState({ guess, score }))
          .catch(err => this.setState({ error: err.message }));
      })
      .catch(err => this.setState({ error: err.message }));
    fetch(`${process.env.REACT_APP_API_URL}/labels`)
      .then(res => res.json())
      .then(labels => this.setState({ labels }))
      .catch(err => this.setState({ error: err.message }));
  }
  next() {
    const nextState = { error: null, currentFileIndex: this.state.currentFileIndex + 1, guess: null, score: null };
    if (nextState.currentFileIndex >= this.state.filenames.length) {
      nextState.filenames = [];
    } else {
      preloadImage(this.state.filenames[nextState.currentFileIndex + 1]);
      preloadImage(this.state.filenames[nextState.currentFileIndex + 2]);
      preloadImage(this.state.filenames[nextState.currentFileIndex + 3]);
      fetch(`${process.env.REACT_APP_API_URL}/recognize/${this.state.filenames[nextState.currentFileIndex]}`)
        .then(res => res.json())
        .then(({ guess, score }) => this.setState({ guess, score }))
        .catch(err => this.setState({ error: err.message }));
    }  
    this.setState(nextState);
  }
  onLabel = (filename, label) => {
    log('Labeled', filename);
    this.next();
    fetch(`${process.env.REACT_APP_API_URL}/tag/${filename}/${label}`)
      .catch(err => this.setState({ error: err.message }));
  }
  onNegative = (filename) => {
    log('Negative', filename);
    this.next();
    fetch(`${process.env.REACT_APP_API_URL}/negative/${filename}`)
      .catch(err => this.setState({ error: err.message }));
  }
  onAddLabel = (label) => {
    fetch(`${process.env.REACT_APP_API_URL}/add-label/${label}`)
      .then(() => fetch(`${process.env.REACT_APP_API_URL}/labels`))
      .then(res => res.json())
      .then(labels => this.setState({ labels }))
      .catch(err => this.setState({ error: err.message }));
  }
  componentDidMount() {
    this.init();
  }
  render() {
    if (this.state.error) {
      return <div className="alert alert-danger" role="alert"><b>Error:</b> {this.state.error}</div>;
    }
    if (!this.state.filenames.length) {
      return <div className="alert alert-success" role="alert">All tagged, great job!</div>;
    }
    return <UntaggedItem
      filename={this.state.filenames[this.state.currentFileIndex]}
      guess={this.state.guess}
      score={this.state.score}
      labels={this.state.labels}
      onLabel={this.onLabel}
      onNegative={this.onNegative}
      onAddLabel={this.onAddLabel}
    />
  }
}

export default App;
