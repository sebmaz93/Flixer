import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "react-modal";
import VideoPlayer from "../Player/Player";
import Spinner from "../Spinner/spinner";

import {
  fetchSeasons,
  fetchPlayVideo,
  selectVideo,
  deletePlayVideoUrl,
  deletPlayVideoMeidaId
} from "../../Actions/VideoInfo_Action";

import {
  heartIcon,
  starIcon,
  arrowLeftIcon
} from "../../assets/IconsSvg";

import "./GridVideoItem.css";
import { starIconFilled } from "../../assets/IconsSvg";

class FavoriteGridVideoItem extends Component {
  state = {
    showModal: false,
    selectedSeason: 1,
    seasonPickerItems: []
  };

  customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgb(25, 28, 32)",
      zIndex: 5
    },
    content: {
      position: "absolute",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      border: "none",
      background: "none",
      overflow: "hidden",
      WebkitOverflowScrolling: "none",
      borderRadius: "4px",
      outline: "none",
      padding: "0px"
    }
  };

  componentWillMount(){
    console.log(this.props.item)
  }

  openPlayer = mediaId => {
    this.props.fetchPlayVideo(mediaId);
    this.setState({ showModal: true });
  };

  closePlayer = () => {
    this.props.deletePlayVideoUrl();
    this.props.deletPlayVideoMeidaId();
    this.setState({ showModal: false });
  };

  render() {
    this.props.item.chapter ?
    console.log(this.props.item.chapter.toString().length)
    : ''
    return (
      <div
        styleName="gridItem"
        onClick={() => {
          this.props.item.type === 'serie' ?
            this.props.goToVideo(this.props.item)
          : this.openPlayer(this.props.item.media_id)
        }}
      >
        <img
          styleName="thumb"
          src={this.props.item.artworkHorizontalImage}
          alt={this.props.item.name}
        />
        <div
          styleName={this.props.item.type === "content" ? "itemInfo" : "hidden"}
        >
          {this.props.item.type === "content" &&
            <p>T01<br /> {this.props.item.chapter && this.props.item.chapter.toString().length === 1 ? "E0" + this.props.item.chapter : 'E' + this.props.item.chapter} </p>
          }
          {this.props.item.type === "serie" && "Serie"}
        </div>
        <span
          className={this.props.item.isFavorite ? "liked" : ""}
          styleName="icon"
        />
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Player"
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          onRequestClose={this.closePlayer}
          ariaHideApp={false}
          style={this.customStyles}
        >
          {this.props.playingVideoUrl ? (
            <div styleName="playerRapper">
              <div styleName="leftArrow" onClick={this.closePlayer}>
                {arrowLeftIcon}
              </div>
              <PlayerWrapper playingURL={this.props.playingVideoUrl} />
            </div>
          ) : (
            <Spinner />
          )}
        </Modal>
      </div>
    );
  }
}

const PlayerWrapper = props => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    tech0rder: ["hls", "html5", "flash"],
    hls: {
      withCredentials: true
    },
    sources: [
      {
        src: props.playingURL,
        type: "application/x-mpegURL",
        withCredentials: true
      }
    ]
  };
  return <VideoPlayer {...videoJsOptions} />;
};
const mapStateToProps = state => ({
  selectedVideo: state.video.selectedVideo,
  playingVideoUrl: state.video.playingVideoUrl,
  seasons: state.video.seasons
});
const mapDispatchToProps = dispatch => ({
  selectVideo: video => dispatch(selectVideo(video)),
  fetchSeasons: id => dispatch(fetchSeasons(id)),
  fetchPlayVideo: mediaId => dispatch(fetchPlayVideo(mediaId)),
  deletePlayVideoUrl: () => dispatch(deletePlayVideoUrl()),
  deletPlayVideoMeidaId: () => dispatch(deletPlayVideoMeidaId())
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  withRef: true
})(FavoriteGridVideoItem);
