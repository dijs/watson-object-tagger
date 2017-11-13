import React,  { Component } from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import Labels from './Labels';
import AddLabel from './AddLabel';

const fullWidth = 640;
const fullHeight = 480;

function itemTitle(guess, score, label) {
  if (score > 0.8) {
    return `${guess} with ${Math.round(score * 100)}%`;
  }
  return label;
}

const apiUrl = process.env.REACT_APP_API_URL || 'http://richard.crushftp.com:5567';

export function UntaggedItem({ filename, tagging, onTag, onLabel, onNegative, labels, onAddLabel, guess, score, onRecognize, processing }) {
  const [label, timestamp, left, right, top, bottom] = filename
    .substring(0, filename.indexOf('.'))
    .split('_');
  const width = right - left;
  const height = bottom - top;
  const title = itemTitle(guess, score, label);
  return <div className="card">
    <div style={{ position: 'relative' }}>
      <LazyLoad>
        <img
          className="card-img-top"
          src={`${apiUrl}/untagged/${filename}`}
          alt={label}
          onLoad={onRecognize}
        />
      </LazyLoad>
      <div style={{
        position: 'absolute',
        top: `${top / fullHeight * 100}%`,
        left: `${left / fullWidth * 100}%`,
        width: `${width / fullWidth * 100}%`,
        height: `${height / fullHeight * 100}%`,
        backgroundColor: 'rgba(255, 0, 0, 0.25)',
      }} />
    </div>
    <div className="card-body">
      <b className="card-title">{processing ? 'Processing...' : title}</b>
      <p className="card-text">{moment(parseInt(timestamp, 10)).format('dddd, hA')}</p>
      <div className="form-group">
        <Labels
          labels={labels}
          onSelect={selectedLabel => onLabel(filename, selectedLabel)}
        />
        <AddLabel onAdd={onAddLabel} />
      </div>
      <button type="button" className="btn btn-danger btn-lg negative" onClick={() => onNegative(filename)}>Negative</button>
    </div>
  </div>;
}

export default class UntaggedItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: null,
      score: 0,
      processing: false,
    };
  }
  recognize = () => {
    this.setState({ processing: true });
    fetch(`${apiUrl}/recognize/${this.props.filename}`)
      .then(res => res.json())
      .then(({ guess, score }) => this.setState({ guess, score, processing: false }))
      .catch(err => this.setState({ error: err.message, processing: false }));
  }
  delayRemove = fn => (...args) => {
    setTimeout(() => fn(...args), 500);
  }
  render() {
    return <UntaggedItem
      {...this.props}
      processing={this.state.processing}
      guess={this.state.guess}
      score={this.state.score}
      onLabel={this.delayRemove(this.props.onLabel)}
      onNegative={this.delayRemove(this.props.onNegative)}
      onRecognize={this.recognize}
    />;
  }
}
