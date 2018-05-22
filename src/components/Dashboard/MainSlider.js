import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

import "./MainSlider.css";
import { selectVideo } from "../../Actions/VideoInfo_Action";

class MainSlider extends Component {
  goToVideo = item => {
    this.props.selectVideo(item);
    this.props.history.push(`/video/${item.id}`);
  };

  componentWillMount(){
    console.log(this.props.banners)
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      dotsClass: "slide-dots__dahsboard slick-dots",
      autoplay: true,
      autoplaySpeed: 5000
    };

    return (
      <Slider {...settings}>
        {this.props.banners.map(item => (
          <div
            styleName="slider"
            key={item.content.id}
            style={ !item.bannerVideo ? {backgroundImage: `url(${item.bannerImage})`} : {}}
            onClick={() => this.goToVideo(item.content)}
          >
            {
              item.bannerVideo ?
              <div styleName='bannerVideo'>
                <video width='auto' height="100%" autoPlay loop playsInLine muted >
                  <source src={item.bannerVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              : ''

            }
            <div styleName="info">
              <div styleName="episode">{item.subtitle}</div>
              <div styleName="title">{item.title}</div>
            </div>
          </div>
        ))}
      </Slider>
    );
  }
}

const mapStateToProps = state => ({
  banners: state.home.banners
});

const mapDispatchToProps = dispatch => ({
  selectVideo: video => dispatch(selectVideo(video))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSlider);
