import React,  { Component } from 'react';
import moment from 'moment';

const labels = [
  'Heather',
  'Richard',
  'Thatch',
  'Langos',
];

function UntaggedItem({ filename, tagging, onTag, onLabel, onNegative, onCancel }) {
  const [, label, timestamp] = filename.match(/(\w+)-(\d+)/); 
  return <div className="card">
    <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}/untagged/${filename}`} alt={label} />
    <div className="card-body">
      <h4 className="card-title">"{label}"</h4>
      <p className="card-text">{moment(parseInt(timestamp, 10)).format('dddd, hA')}</p>
      <div className={`form-group labels ${tagging ? 'tagging' : ''}`}>
        <ul className="list-group list-group-flush">
          {labels.map(label => <li key={label} className="list-group-item" onClick={() => onLabel(filename, label)}>{label}</li>)}
        </ul>
      </div>
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
      tagging: false
    };
  }
  render() {
    return <UntaggedItem
      {...this.props}
      tagging={this.state.tagging}
      onTag={() => this.setState({ tagging: true })}
      onCancel={() => this.setState({ tagging: false })}
      onLabel={this.props.onLabel}
      onNegative={this.props.onNegative}
    />;
  }
}



