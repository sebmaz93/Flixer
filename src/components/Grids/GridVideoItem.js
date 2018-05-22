import React from "react";

import "./GridVideoItem.css";
import { favoriteFilled } from "../../assets/IconsSvg";

const GridVideoItem = props => (
  <div
    styleName="gridItem"
    onClick={() => {
      props.goToVideo(props.item);
    }}
  >
    <img
      styleName="thumb"
      src={props.item.artworkHorizontalImage}
      alt={props.item.name}
    />
    <span
      className={props.item.isFavorite ? "liked" : ""}
      styleName="icon"
      onClick={e => {
        console.log(props.item.id);
        props.toggleFavorite(props.item, props.title);
        e.stopPropagation();
      }}
    >
      {favoriteFilled}
    </span>
  </div>
);

export default GridVideoItem;
