import React, { Component } from "react";
import "./ProgressBar.css";

class ProgressBar extends Component {
  state = {
    style: { width: 0 },
    start: false
  };
  setFullWidth() {
    this.setState({ ...this.state, style: { width: 100 } });
  }
  setMinWidth() {
    this.setState({ ...this.state, style: { width: 0 } });
  }
  setStart() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.setState({ style: { width: 0 }, start: true }, () => {
      this.interval = setInterval(() => {
        !this.props.isPaused &&
        this.setState({
          ...this.state,
          style: {
            width:
              this.state.style.width +
              50 * 100 / (this.props.story.duration * 1000)
          }
        });
        if (this.state.style.width >= 100) {
          clearInterval(this.interval);
          this.props.nextStory();
        }
      }, 50);
    });
  }
  setStartToFalse() {
    this.setState({ style: { width: 0 }, start: false });
    clearInterval(this.interval);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <div styleName="bar" style={{ width: `${this.state.style.width}%`, maxWidth:'100%' }} />
      </div>
    );
  }
}
export default ProgressBar;
