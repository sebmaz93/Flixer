import React, { Component } from "react";

import "./EpisodsSlider.css";
import {
  arrowLeftIcon,
  arrowRightIcon,
  heartIconFilled,
  heartIcon,
  starIconFilled,
  starIcon
} from "../../assets/IconsSvg";

export default class EpisodsSlider extends Component {
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
  toggleFavorite = video => {};
  render() {
    return (
      <div>
        <div styleName="main">
          {
             this.props.section.length > 5 &&
             <span onClick={this.rightButton} styleName="arrow leftArrow">
               {arrowLeftIcon}
             </span>
          }
          <div styleName="contain">
            <div styleName="row" id={this.props.title}>
              <div styleName="row__inner">
                {this.props.section.map((video, index) => (
                  <div key={video.id} id={video.id} styleName="tile slideItem">
                    <div styleName="tile__media">
                      <img
                        styleName={
                          !!video.seen ? "tile__img grayScale" : "tile__img"
                        }
                        src={video.chapterImage}
                        alt={video.name}
                      />
                    </div>
                    <div
                      styleName="tile__details"
                      onClick={() => {
                        this.props.openPlayer(video.media_id);
                      }}
                    >
                      <div styleName="tile__title" />
                    </div>
                    {/*DESCRIPTION*/}
                    <div styleName={!!video.seen ? "descriptionSection muted" : "descriptionSection"}>
                      <p styleName="episodeNumber">{video.chapter}</p>
                      <h3 styleName="episodeTitle">{video.name}</h3>
                        <div styleName="iconGroup">
                          <span
                            styleName="icon"
                            onClick={e => {
                              e.stopPropagation();
                              this.props.toggleFavorite(video, this.props.title);
                            }}
                          >
                            {!!video.like ? heartIconFilled : heartIcon}
                          </span>
                          <span
                            styleName="icon_fav"
                            onClick={() => {
                              this.props.toggleFavorite(
                                video.media_id,
                                video.isFavorite
                              );
                            }}
                          >
                            {!!video.isFavorite ? starIconFilled : starIcon}
                          </span>
                        </div>
                      <p styleName="episodeInfo">{video.description}</p>
                    </div>
                    {/*DESCRIPTION END */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {
            this.props.section.length > 5 &&
            <span onClick={this.leftButton} styleName="arrow rightArrow">
              {arrowRightIcon}
            </span>
          }
        </div>
      </div>
    );
  }
}
