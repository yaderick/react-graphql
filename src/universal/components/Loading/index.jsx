import React, { Component } from 'react';
import './style.less';

const TICK_RATE = 500;

class LoadingIndicator extends Component {
  state = {
    dots: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.onTick, TICK_RATE);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onTick = () => {
    this.setState(prevState => ({ dots: (prevState.dots + 1) % 4 }));
  };

  render() {
    const { dots } = this.state;

    return (
      <div className="LoadingIndicator">
        <small>Loading {new Array(dots).fill(0).map(() => '.')}</small>
      </div>
    );
  }
}

export default LoadingIndicator;
