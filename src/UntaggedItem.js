import React,  { Component } from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';

const labels = [
  'Heather',
  'Richard',
  'Thatch',
  'Langos',
  'VW'
];

const fullWidth = 640;
const fullHeight = 480;

function UntaggedItem({ filename, tagging, onTag, onLabel, onNegative, onCancel, removing }) {
  const [label, timestamp, left, right, top, bottom] = filename
    .substring(0, filename.indexOf('.'))
    .split('_');
  const width = right - left;
  const height = bottom - top;
  return <div className={`card animated bounceIn ${removing && 'rotateOutUpRight'}`}>
    <div style={{ position: 'relative' }}>
      <LazyLoad>
        <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}/untagged/${filename}`} alt={label} />
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
      <h4 className="card-title">"{label}"</h4>
      <p className="card-text">{moment(parseInt(timestamp, 10)).format('dddd, hA')}</p>
      {tagging && <div className="form-group animated lightSpeedIn">
        <ul className="list-group list-group-flush">
          {labels.map(label => <li key={label} className="list-group-item" onClick={() => onLabel(filename, label)}>{label}</li>)}
        </ul>
      </div>}
      {
        !tagging ? <div>
          <button type="button" className="btn btn-primary btn-lg tag" onClick={onTag}>Tag</button>
          <button type="button" className="btn btn-danger btn-lg negative" onClick={() => onNegative(filename)}>Negative</button>
        </div> : <div>
          <button type="button" className="btn btn-primary btn-lg confirm" onClick={onCancel}>Cancel</button>
        </div>
      }
    </div>
  </div>;
}

export default class UntaggedItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagging: false,
      removing: false,
    };
  }
  delayRemove = fn => (...args) => {
    this.setState({ removing: true });
    setTimeout(() => fn(...args), 500);
  }
  render() {
    return <UntaggedItem
      {...this.props}
      tagging={this.state.tagging}
      removing={this.state.removing}
      onTag={() => this.setState({ tagging: true })}
      onCancel={() => this.setState({ tagging: false })}
      onLabel={this.delayRemove(this.props.onLabel)}
      onNegative={this.delayRemove(this.props.onNegative)}
    />;
  }
}
