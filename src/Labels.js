import React from 'react';

export default function Labels({ labels, onSelect, type = 'Buttons' }) {
  if (type === 'ListGroup') {
    return <ul className="list-group list-group-flush">
      {labels.map(label => <li key={label} className="list-group-item" onClick={() => onSelect(label)}>{label}</li>)}
    </ul>;
  }
  if (type === 'Buttons') {
    return <div>
      {
        labels.map(label => {
          return <button
            key={label}
            className="btn btn-primary btn-sm"
            style={{ marginRight: '10px', marginBottom: '10px' }}
            onClick={() => onSelect(label)}
            >
              {label}
            </button>;
          })
      }
    </div>;
  }
}