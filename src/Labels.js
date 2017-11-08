import React from 'react';

export default class Labels extends React.Component {
  render() {
    const { labels, onSelect, onAdd } = this.props;
    return <div>
      <ul className="list-group list-group-flush">
        {labels.map(label => <li key={label} className="list-group-item" onClick={() => onSelect(label)}>{label}</li>)}
      </ul>
      <br />
      <form className="form-inline">
        <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="New Label" ref={newLabel => this.newLabel = newLabel}/>
        <button type="button" className="btn btn-primary" onClick={() => {
          onAdd(this.newLabel.value);
          this.newLabel.value = '';
        }}>Add</button>
      </form>
    </div>;
  }
}