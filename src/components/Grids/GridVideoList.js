import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectVideo } from "../../Actions/VideoInfo_Action";
import "./GridVideoList.css";
import GridVideoItem from "./GridVideoItem";

class GridVideoList extends Component {
  goToVideo = video => {
    this.props.selectVideo(video);
    this.props.history.push(`/video/${video.id}`);
  };
  render() {
    return (
      <div styleName="grid">
        {this.props.items.length > 0 ? (
          this.props.items.map(item => (
            <GridVideoItem
              toggleFavorite={this.props.toggleFavorite}
              key={item.id}
              item={item}
              title={this.props.title}
              goToVideo={this.goToVideo}
            />
          ))
        ) : (
          <h1> No hay resultados para tu búsqueda.</h1>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectVideo: video => dispatch(selectVideo(video))
});
export default withRouter(
  connect(undefined, mapDispatchToProps)(GridVideoList)
);
