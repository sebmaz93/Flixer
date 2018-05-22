import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import Slider, { slickPrev } from "react-slick";
import { selectVideo } from "../../Actions/VideoInfo_Action";

import {
  stories_swipe
} from "../../assets/IconsSvg";

import ProgressBar from "./ProgressBar";
import "./StoryView.css";
import { close, arrowRightIcon, arrowLeftIcon } from "../../assets/IconsSvg";

class StoryView extends Component {
  state = {
    duration: this.props.stories.duration,
    selectedIndex: 0,
    isPaused: false
  };
  componentDidMount() {
    this[`Progress0`].setStart();
  }
  nextStoryClick = () => {
    this[`Progress${this.state.selectedIndex}`].setFullWidth();
  };
  nextStory = () => {
    this[`Progress${this.state.selectedIndex}`].setFullWidth();
    if (this.state.selectedIndex + 1 > this.props.stories.contents.length - 1) {
      this.props.closeModal();
      return;
    }
    this[`Progress${this.state.selectedIndex + 1}`].setStart();
    this.setState({
      ...this.state,
      selectedIndex: this.state.selectedIndex + 1
    });
  };

  prevStory = () => {
    if (this.state.selectedIndex - 1 < 0) {
      this[`Progress${this.state.selectedIndex}`].setStart();
      return;
    }
    this[`Progress${this.state.selectedIndex - 1}`].setStart();
    this[`Progress${this.state.selectedIndex}`].setStartToFalse();
    this.setState({
      ...this.state,
      selectedIndex: this.state.selectedIndex - 1
    });
  };

  goToVideo = video => {
    console.log(video)
    this.props.closeModal();
    this.props.selectVideo(video);
    this.props.history.push(`/video/${video.id}`);
    console.log(localStorage.selectedVideo)
  };

  render() {
    return (
      <div styleName="modal">
        <span onClick={this.prevStory} styleName="arrow leftArrow">
          {arrowLeftIcon}
        </span>
        <div styleName="header">
          <img styleName="thumb" src={this.props.stories.avatar} alt="" />
          <h2 styleName="title">{this.props.stories.publisher}</h2>
          <i
            styleName="close"
            onClick={() => {
              this.props.closeModal();
            }}
          >
            {close}
          </i>
        </div>
        <div styleName='progress-holder'>
          {this.props.stories.contents.map((story, index) => (
              <div
                style={{
                  width: `${this.props.stories.contents.length -1 != index ? `calc(${100 / this.props.stories.contents.length}% - 5px )` : `${100 / this.props.stories.contents.length}% `}`,
                  height: "3px",
                  display: "inline-block",
                  marginRight: `${this.props.stories.contents.length -1 === index ? '0' : '5px'}`,
                  backgroundColor: "rgba(255, 255, 255, 0.261)"
                }}
                key={story.id}
              >
                <ProgressBar
                  story={story}
                  ref={r => (this[`Progress${index}`] = r)}
                  nextStory={this.nextStory}
                  prevStory={this.prevStory}
                  isLast={this.props.stories.contents.length -1 === index ? true : false }
                  isPaused={this.state.isPaused}
                />
              </div>
          ))}
        </div>
        <div styleName="storyItem" onMouseDown={() => {this.setState({isPaused: true})}} onMouseUp={() => {this.setState({isPaused: false})}}>
          <img
            styleName="preview"
            src={
              this.props.stories.contents[this.state.selectedIndex].storyContent
            }

          />
        {this.props.stories.relatedContent &&
          <div styleName='view-more' onClick={() => {this.goToVideo(this.props.stories.relatedContent)}}>
            <span>{stories_swipe}</span>
            Ver Más
          </div>
        }
        </div>
        <span onClick={this.nextStoryClick} styleName="arrow rightArrow">
          {arrowRightIcon}
        </span>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  selectVideo: video => dispatch(selectVideo(video))
});
export default connect(undefined, mapDispatchToProps)(StoryView);
