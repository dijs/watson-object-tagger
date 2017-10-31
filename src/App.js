import React, { Component } from 'react';
import UntaggedItem from './UntaggedItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filenames: []
    };
  }
  update = () => {
    fetch(`${process.env.REACT_APP_API_URL}/untagged`)
      .then(res => res.json())
      .then(filenames => this.setState({ filenames }));    
  }
  onLabel = (filename, label) => {
    fetch(`${process.env.REACT_APP_API_URL}/tag/${filename}/${label}`)
      .then(() => this.setState({ filenames: this.state.filenames.filter(n => n !== filename) }));
  }
  onNegative = (filename) => {
    fetch(`${process.env.REACT_APP_API_URL}/negative/${filename}`)
      .then(() => this.setState({ filenames: this.state.filenames.filter(n => n !== filename) }));
  }
  componentDidMount() {
    this.update();
  }
  render() {
    if (!this.state.filenames.length) {
      return <div>All tagged, great job!</div>;
    }
    return (
      <div className="App">
        {this.state.filenames.map(filename => <UntaggedItem key={filename} filename={filename} onLabel={this.onLabel} onNegative={this.onNegative} />)}
      </div>
    );
  }
}

export default App;
