import React from "react";

import "./VideoInfo.css";
import { favoriteIcon, playIcon } from "../../assets/IconsSvg";

const Info = props => (
  <div styleName="info">
    <div styleName="about">
      <div styleName="heading">
        <h2 styleName="title">{props.selectedVideo.title}</h2>
        {/*<p styleName="episodes">
          {props.selectedVideo.seasons} Season(s) {props.selectedVideo.episodes}{" "}
          Episodes
        </p>
        <p styleName="category">{props.selectedVideo.type}</p>
        <p styleName="year">{props.selectedVideo.year}</p>*/}
      </div>
      <div styleName="description">
        <p>{props.selectedVideo.description}</p>
      </div>
      {/*<div styleName="buttons">
        <ul styleName="lista">
          <li>
            <p>
              <i styleName="play">{playIcon}</i>
              <span styleName="iconText">Ver ahora</span>
            </p>
          </li>
          <li>
            <p>
              <i styleName="fav">{favoriteIcon}</i>
              <span styleName="iconText">Mi Lista</span>
            </p>
          </li>
        </ul>
      </div>*/}
    </div>
  </div>
);

export default Info;
