import React, { Component } from "react";
import videojs from "video.js";
import * as HLS from "videojs-contrib-hls";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import { connect } from "react-redux";

import { setPlaybackTime } from "../../Actions/VideoInfo_Action";
import "./Player.css";

import Amplitude from "react-amplitude";

class VideoPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      // console.log("onPlayerReady", this);
      // console.log(this.currentTime());
      // console.log("HLS", HLS);
    });

    // INTERVAL TO SET PLAYBACK TIME EVERY 5 SECOND
    this.interval = setInterval(() => {
      const time = this.player.currentTime();
      this.props.setPlaybackTime(this.props.playingVideoMediaId, time);
    }, 5000);

    // ACCESSING QUALITY LEVELS
    this.player.qualityLevels();
    //this.player.hlsQualitySelector();
    // let qualityLevels = this.player.qualityLevels();
    // qualityLevels.on("addqualitylevel", function(event) {
    //   let qualityLevel = event.qualityLevel;

    //   if (qualityLevel.height >= 1080) {
    //     qualityLevel.enabled = true;
    //   } else if (qualityLevel.height >= 720) {
    //     qualityLevel.enabled = true;
    //   } else {
    //     qualityLevel.enabled = false;
    //   }
    // });
    // console.log(qualityLevels);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
    clearInterval(this.interval);
  }

  render() {
    Amplitude.logEvent("Screen_Player");
    return (
      <div data-vjs-player>
        <video
          ref={node => (this.videoNode = node)}
          className="video-js mainPlayer"
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  setPlaybackTime: (mediaId, time) => dispatch(setPlaybackTime(mediaId, time))
});
const mapStateToProps = state => ({
  playingVideoMediaId: state.video.playingVideoMediaId
});
export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
// export const videoJsOptions = {
//   autoplay: false,
//   controls: true,
//   tech0rder: ["HLS", "html5", "flash"],
//   hls: {
//     withCredentials: true
//   },
//   sources: [
//     {
//       src:
//         "https://api.osde.plix.com.ar/6a3d007e-894f-416e-9cac-fc1a10870dda/CAMPANA_NEO_BACKSTAGE.m3u8",
//       type: "application/x-mpegURL"
//     }
//   ]
// };

// export const videoJsOptions2 = {
//   autoplay: false,
//   controls: true,
//   tech0rder: ["HLS", "html5", "flash"],
//   hls: {
//     withCredentials: true
//   },
//   sources: [
//     {
//       src:
//         "https://s3.amazonaws.com/_bc_dml/example-content/bipbop-advanced/bipbop_16x9_variant.m3u8",
//       type: "application/x-mpegURL"
//     }
//   ]
// };

// export const videoJsOptions3 = {
//   autoplay: false,
//   controls: true,
//   tech0rder: ["HLS", "html5", "flash"],
//   hls: {
//     withCredentials: true
//   },
//   sources: [
//     {
//       src: "http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8",
//       type: "application/x-mpegURL"
//     }
//   ]
// };
