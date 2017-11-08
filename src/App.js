import React, { Component } from 'react';
import UntaggedItem from './UntaggedItem';
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
      .then(() => this.setState({ filenames: this.state.filenames.filter(n => n !== filename) }))
      .catch(err => this.setState({ error: err.message }));
  }
  onNegative = (filename) => {
    this.setState({ error: null });
    fetch(`${process.env.REACT_APP_API_URL}/negative/${filename}`)
      .then(() => this.setState({ filenames: this.state.filenames.filter(n => n !== filename) }))
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
    if (this.state.error) {
      return <div className="alert alert-danger" role="alert"><b>Error:</b> {this.state.error}</div>;
    }
    if (!this.state.filenames.length) {
      return <div className="alert alert-success" role="alert">All tagged, great job!</div>;
    }
    return (
      <div className="App">
        {this.state.filenames.map(filename => <UntaggedItem key={filename} filename={filename} labels={this.state.labels} onLabel={this.onLabel} onNegative={this.onNegative} onAddLabel={this.onAddLabel} />)}
      </div>
    );
  }
}

export default App;
