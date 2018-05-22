import React, { Component } from "react";
import Slider from "react-slick";
import { withRouter } from "react-router-dom";

import { ar_left, ar_right } from "../../assets/IconsSvg";
import "./OnBoarding.css";
import osdeLogo from "../../assets/osdeLogo.png";
import ob1 from "../../assets/onboarding/ob1.png";
import ob2 from "../../assets/onboarding/ob2.png";
import ob3 from "../../assets/onboarding/ob3.png";
import ob4 from "../../assets/onboarding/ob4.png";
import ob5 from "../../assets/onboarding/ob5.png";
import ob6 from "../../assets/BlurBg.png";
import Terms from "./Terms";

class OnBoarding extends Component {
  NextArrow = ({ onClick, index, history }) => {
    return (
      <div
        styleName="arrow right"
        onClick={() => {
          console.log(index);
          if (index === 3) {
            history.push("/terms");
            return;
          }
          onClick();
        }}
      >
        <div styleName="rightArrowIcon"> {ar_right}</div>
      </div>
    );
  };
  PrevArrow = ({ onClick }) => {
    return (
      <div styleName="arrow left" onClick={onClick}>
        <div styleName="leftArrowIcon">{ar_left}</div>
      </div>
    );
  };
  state = {
    index: 0
  };
  initalizeData = () => {};
  render() {
    const settings = {
      nextArrow: (
        <this.NextArrow index={this.state.index} history={this.props.history} />
      ),
      prevArrow: <this.PrevArrow />,
      dots: true,
      infinite: false,
      speed: 700,
      autoplay: true,
      autoplaySpeed: 8000,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      dotsClass: "slide-dots__onboarding slick-dots",
      centerPadding: "0px",
      afterChange: index => {
        this.setState({ ...this.state, index });
      }
    };
    return (
      <div>
        <div styleName="background">
          <div styleName="card">
            <Slider {...settings}>
              <div styleName="item">
                <div styleName="image">
                  <img src={ob1} alt="" />
                </div>
                <div styleName="content">
                  <h3>Te damos la bievenida</h3>
                  <p>Disfrutá los mejores contenidos <br /> en un sólo lugar.</p>
                </div>
              </div>
              <div styleName="item">
                <div styleName="image">
                  <img src={ob2} alt="" />
                </div>
                <div styleName="content">
                  <h3>Información</h3>
                  <p>Todas las novedades <br /> a tu alcance.</p>
                </div>
              </div>
              <div styleName="item">
                <div styleName="image">
                  <img src={ob3} alt="" />
                </div>
                <div styleName="content">
                  <h3>Te avisamos</h3>
                  <p>Podés activar las notificaciones <br /> de acuerdo a tus intereses.</p>
                </div>
              </div>
              <div styleName="item">
                <div styleName="image">
                  <img src={ob5} alt="" />
                </div>
                <div styleName="content">
                  <h3>Donde quieras</h3>
                  <p>
                    Disfrutá de todo el contenido <br /> en el dispositivo que
                    prefieras.
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OnBoarding);
