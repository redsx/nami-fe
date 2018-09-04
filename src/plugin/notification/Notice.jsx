import React, { Component } from 'react';

export default class extends Component {
  timer = null;
  static defaultProps = {
    onClose() {},
    onEnd() {},
    duration: 1.5,
    className: '',
  };
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    this.clearTimer();
    if (this.props.duration) {
      setTimeout(
        () => {
          this._close();
        },
        this.props.duration * 1000
      );
    }
  }
  componentWillUnmount() {
    this.clearTimer();
  }
  render() {
    const { className, style, children } = this.props;
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  _close() {
    this.clearTimer();
    this.props.onEnd();
    this.props.onClose();
  }
  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}