import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import videojs from 'video.js';

import { loginWithGoogle } from "../../Actions/Auth_Action";
import { hideLoginError } from "../../Actions/Error_Action";

import { LoginPanel } from "./LoginRecoverPanel";
import "./LoginPage.css";
import loginBg from '../../assets/login_bg.jpg';
import osdeLogo from "../../assets/qbo-logo.png";
import ErrorLogin from "./ErrorLogin";

class LoginPage extends Component {
  state = { path: "login" };
  toggle = () => {
    const query = this.state.path === "login" ? "recover" : "login";
    return this.setState({ path: query });
  };
  errorMessage = {
    title: "Ingreso no autorizado",
    description:
      "Para acceder a la plataforma se requiere contar conun usuario corporativo válido. Por consultas contactarse con la Mesa de Ayuda de Sistemas"
  };
  successGoogle = res => {
    this.props.loginWithGoogle(res.tokenId);
  };
  failureGoogle = res => {
    console.log(res);
  };
  loopVideo = () => {
    console.log('Video Ended');
    let video = this.refs.video;
    video.load();
    video.play();
  }
  render() {
    return (
      <div>
        <div styleName="background overlay" />
        <div styleName='video-bg'>
          <video
            onPause={() => {this.loopVideo()}}
            ref='video'
            width='auto'
            height="100%"
            loop autoPlay muted
            styleName='video-bg-video'
            preload='metadata'
            poster={loginBg}>
              <source src='https://assets.plix.com.ar/assets/videos/VIDEO_INICIO.mp4' type="video/mp4" />
              Tu navegador no permite la etiqueta de Video.
          </video>
          <div styleName='gradient-overlay'></div>
        </div>

        <div styleName="card">
          <div styleName="logoImg">
            <img src={osdeLogo} alt="Background" styleName="" />
          </div>
          {this.state.path === "login" ? (
            <LoginPanel
              toggle={this.toggle}
              successGoogle={this.successGoogle}
              failureGoogle={this.failureGoogle}
            />
          ) : (
            ""
          )}
          {this.props.error && (
            <ErrorLogin
              handleClose={this.props.hideLoginError}
              errorMessage={this.errorMessage}
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error.login
});
const mapDispatchToProps = dispatch => ({
  loginWithGoogle: GoogleToken => dispatch(loginWithGoogle(GoogleToken)),
  hideLoginError: () => dispatch(hideLoginError())
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
