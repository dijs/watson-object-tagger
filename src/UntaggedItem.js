import React,  { Component } from 'react';
import moment from 'moment';

const labels = [
  'Heather',
  'Richard',
  'Thatch',
  'Langos',
];

function UntaggedItem({ filename, tagging, onTag, onLabel, onNegative, onCancel, removing }) {
  const [label, timestamp, left, right, top, bottom] = filename
    .substring(0, filename.indexOf('.'))
    .split('_');
  return <div className={`card animated bounceIn ${removing && 'rotateOutUpRight'}`}>
    <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}/untagged/${filename}`} alt={label} />
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



