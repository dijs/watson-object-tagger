import React, { Component } from 'react';
import ReactSwipe from 'react-swipe'; 
import UntaggedItem from './UntaggedItem';

class Carousel extends Component {
  render() {
    if (this.props.error) {
      return <div className="alert alert-danger" role="alert"><b>Error:</b> {this.props.error}</div>;
    }
    if (!this.props.filenames.length) {
      return <div className="alert alert-success" role="alert">All tagged, great job!</div>;
    }
    const items = this.props.filenames
      .map((filename, index) => {
        return <div key={index}>
          <div className="item">
            <UntaggedItem
              filename={filename}
              labels={this.props.labels}
              active={this.reactSwipe && index === this.reactSwipe.getPos()}
              onLabel={(...args) => {
                this.reactSwipe.next();
                this.props.onLabel(...args);
              }}
              onNegative={(...args) => {
                this.reactSwipe.next();
                this.props.onNegative(...args);
              }}
              onAddLabel={this.props.onAddLabel}
            />
          </div>
        </div>;
      });
    const swipeOptions = {};
    return <div>
      <div className="text-center">{items.length - (this.reactSwipe ? this.reactSwipe.getPos() : 0)} left to tag.</div>
      <ReactSwipe ref={el => this.reactSwipe = el} swipeOptions={swipeOptions}>
        {items}
      </ReactSwipe>      
    </div>;
  }
}

export default Carousel;
