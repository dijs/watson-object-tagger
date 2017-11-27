import React from 'react';
import moment from 'moment';
import Labels from './Labels';
import AddLabel from './AddLabel';

const fullWidth = 640;
const fullHeight = 480;

function itemTitle(guess, score, label) {
  if (guess) {
    return `${guess} with ${Math.round(score * 100)}%`;
  }
  return label;
}

export default function UntaggedItem({ filename, tagging, onTag, onLabel, onNegative, labels, onAddLabel, guess, score, onRecognize, processing, error }) {
  const [label, timestamp, left, right, top, bottom] = filename
    .substring(0, filename.indexOf('.'))
    .split('_');
  const width = right - left;
  const height = bottom - top;
  const title = error ? error : itemTitle(guess, score, label);
  return <div className="card">
    <div style={{ position: 'relative' }}>
      <img
        className="card-img-top"
        src={`${process.env.REACT_APP_API_URL}/untagged/${filename}`}
        alt={label}
      />
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
      <div className="row">
        <div className="col-8">
          <b className="card-title">{processing ? 'Processing...' : title}</b>
          <p className="card-text">{moment(parseInt(timestamp, 10)).format('dddd, hA')}</p>          
        </div>
        <div className="col-4">
          <button type="button" className="btn btn-danger negative" onClick={() => onNegative(filename)}>Negative</button>
        </div>
      </div>
      <br />
      <div className="form-group">
        <Labels
          labels={labels}
          onSelect={selectedLabel => onLabel(filename, selectedLabel)}
        />
        <AddLabel onAdd={onAddLabel} />
      </div>
    </div>
  </div>;
};
