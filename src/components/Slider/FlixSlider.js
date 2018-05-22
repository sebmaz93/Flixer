import React, { Component } from "react";
import { connect } from "react-redux";
import { selectVideo } from "../../Actions/VideoInfo_Action";

import "./FlixSlider.css";
import {
  arrowLeftIcon,
  arrowRightIcon,
  heartIconFilled,
  heartIcon,
  starIcon,
  starIconFilled
} from "../../assets/IconsSvg";

class FlixSlider extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false
    };
  }

  goToVideo = video => {
    this.props.selectVideo(video);
    this.props.history.push(`/video/${video.id}`);
  };
  leftButton = e => {
    const slider = document.getElementById(this.props.title);
    let transition = 0;
    const interval = setInterval(() => {
      slider.scrollLeft += 10;
      transition += 10;
      if (transition === 250) {
        clearInterval(interval);
      }
    }, 15);
  };
  rightButton = e => {
    const slider = document.getElementById(this.props.title);
    let transition = 0;
    const interval = setInterval(() => {
      slider.scrollLeft -= 10;
      transition += 10;
      if (transition === 250) {
        clearInterval(interval);
      }
    }, 15);
  };

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  render() {
    return (
      <div
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <h3 styleName="title">{this.props.title}</h3>
        <div styleName="main">
          {/*<span
            onClick={this.rightButton}
            styleName={
              this.props.align === "vertical"
                ? "arrowVertical leftArrow"
                : "arrow leftArrow"
            }
          >
            {arrowLeftIcon}
          </span> */}
          {
            this.state.isHovering && this.props.section.length > 5 &&  (
            <span
              onClick={this.rightButton}
              styleName={
                this.props.align === "vertical"
                  ? "arrowVertical leftArrow"
                  : "arrow leftArrow"
              }
            >
              {arrowLeftIcon}
            </span>
          )}

          <div styleName="contain">
            <div styleName="row" id={this.props.title}>
              <div styleName="row__inner">
                {this.props.section.map(video => (
                  <div
                    key={video.id}
                    id={video.id}
                    styleName={
                      this.props.align === "vertical"
                        ? "tile slideItemVertical"
                        : "tile slideItem"
                    }
                    onClick={() => this.goToVideo(video)}
                  >
                    <div styleName="tile__media">
                      <img
                        styleName="tile__img"
                        src={
                          this.props.title === "Destacados"
                            ? video.artworkVerticalImage
                            : video.artworkHorizontalImage
                        }
                        alt={video.title}
                      />
                    </div>
                    <div styleName="tile__details">
                      {/*is favorite or not*/}
                      {/*is liked or not*/}
                      {/*<div styleName="tile__title">{video.title}</div>*/}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/*<span
            onClick={this.leftButton}
            styleName={
              this.props.align === "vertical"
                ? "arrowVertical rightArrow"
                : "arrow rightArrow"
            }
          >
            {arrowRightIcon}
          </span>*/}
          {this.state.isHovering && this.props.section.length > 5 && (
            <span
              onClick={this.leftButton}
              styleName={
                this.props.align === "vertical"
                  ? "arrowVertical rightArrow"
                  : "arrow rightArrow"
              }
            >
              {arrowRightIcon}
            </span>
          )}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  selectVideo: video => dispatch(selectVideo(video))
});
export default connect(undefined, mapDispatchToProps)(FlixSlider);
