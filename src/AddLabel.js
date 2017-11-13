import React from 'react';

export default class AddLabel extends React.Component {
  render() {
    const { labels, onSelect, onAdd } = this.props;
    return <form className="form-inline">
      <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="New Label" ref={newLabel => this.newLabel = newLabel}/>
      <button type="button" className="btn btn-info" onClick={() => {
        const value = this.newLabel.value;
        if (value.trim().length > 0) {
          onAdd(value);
          this.newLabel.value = '';
        }
      }}>Add</button>
    </form>;
  }
}