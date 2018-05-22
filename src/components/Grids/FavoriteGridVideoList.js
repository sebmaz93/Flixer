import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectVideo } from "../../Actions/VideoInfo_Action";
import "./GridVideoList.css";
import FavoriteGridVideoItem from "./FavoriteGridVideoItem";

class FavoriteGridVideoList extends Component {
  goToVideo = video => {
    this.props.selectVideo(video);
    this.props.history.push(`/video/${video.id}`);
  };
  render() {
    return (
      <div styleName="grid">
        {this.props.items.length > 0 ? (
          this.props.items.map(item => (
            <FavoriteGridVideoItem
              goToVideo={this.goToVideo}
              key={item.id}
              item={item}
            />
          ))
        ) : (
          <h1> </h1>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  selectVideo: video => dispatch(selectVideo(video))
});

export default withRouter(
  connect(undefined, mapDispatchToProps)(FavoriteGridVideoList)
);
