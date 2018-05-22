import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import VideoPlayer from "../Player/Player";

import Episodes from "./VideoEpisodes";
import Info from "./VideoInfo";
import Spinner from "../Spinner/spinner";

import Amplitude from "react-amplitude";

import {
  heartIcon,
  starIcon
} from "../../assets/IconsSvg";

import {
  fetchSeasons,
  fetchPlayVideo,
  selectVideo,
  deletePlayVideoUrl,
  deletPlayVideoMeidaId
} from "../../Actions/VideoInfo_Action";
import "./VideoMain.css";

import { arrowLeftIcon } from "../../assets/IconsSvg";

class VideoMain extends Component {
  state = {
    showModal: false,
    selectedSeason: 1,
    seasonPickerItems: []
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  initalizeData = () => {
    if (this.props.selectedVideo) {
      localStorage.setItem(
        "selectedVideo",
        JSON.stringify(this.props.selectedVideo)
      );
      this.props.fetchSeasons(this.props.selectedVideo.id);
    } else {
      const selectedVideo = JSON.parse(localStorage.getItem("selectedVideo"));
      this.props.selectVideo(selectedVideo);
      this.props.fetchSeasons(selectedVideo.id);
    }
  };
  openPlayer = mediaId => {
    this.props.fetchPlayVideo(mediaId);
    this.setState({ showModal: true });
  };
  closePlayer = () => {
    this.props.deletePlayVideoUrl();
    this.props.deletPlayVideoMeidaId();
    this.setState({ showModal: false });
  };

  getSeasonPickerItems = () => {
    let seasonPickerItems = [];
    for (var i = 0; i < this.props.selectedVideo.seasons; i++) {
      seasonPickerItems.push(<option value={i}>{i}</option>)
    };
    return seasonPickerItems
  }

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
    console.log(this.props.selectedVideo);
  }

  render() {
    Amplitude.logEvent("Screen_VideoInfo", {'video.type': this.props.selectedVideo.type,'video.id': this.props.selectedVideo.media_id, 'video.title': this.props.selectedVideo.title}, console.log(this.props.selectedVideo));
    return (
      <div>
        {this.props.selectedVideo && (
          <div
            styleName="cover"
            style={{
              backgroundImage: `url(${this.props.selectedVideo.bannerImage ||
                this.props.selectedVideo.previewImage})`
            }}
          >
          <div styleName='bannerOverlay'>
            <h1 styleName="title">{this.props.selectedVideo.title}</h1>
              <p styleName="episodes">
                {this.props.selectedVideo.year} { this.props.selectedVideo.seasons} {this.props.selectedVideo.seasons === 1 ? 'temporada' : 'temporadas'}
                <span styleName='iconGroup'>
                  <i styleName="icon">{heartIcon}</i>
                  <i styleName="icon">{starIcon}</i>
                </span>
              </p>
              <div styleName="description">
                <p>{this.props.selectedVideo.description}</p>
              </div>
              {
                this.props.selectedVideo ?
                <select styleName='season-picker'>
                  <option>Temporada 1</option>
                </select>
                : ''
              }
          </div>
        </div>
        )}

        <div styleName="body">
          {this.props.seasons.length > 0 && (
            <Episodes
              seasons={this.props.seasons}
              openPlayer={this.openPlayer}
            />
          )}
        </div>
        <div styleName="EMPTY_SPACE" />
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
})(VideoMain);
