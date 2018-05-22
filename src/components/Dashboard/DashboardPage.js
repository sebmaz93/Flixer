import React, { Component } from "react";
import { connect } from "react-redux";

import { toggleFavorite, fetchHome } from "../../Actions/Home_Action";
import { selectVideo } from "../../Actions/VideoInfo_Action";

import Spinner from "../Spinner/spinner";
import StoryList from "../Stories/StoryList";
import MainSlider from "./MainSlider";
import FlixSlider from "../Slider/FlixSlider";
import "./DashboardPage.css";

import Amplitude from "react-amplitude";

class DashboardPage extends Component {

  componentWillMount(){
    console.log(this.props.home.sections);
  }

  initalizeData = () => {
    this.props.fetchHome();
  };
  render() {
    Amplitude.logEvent("Screen_Home");
    const sections = Object.keys(this.props.home.sections).map(key => {
      let align = "horizon";
      if (key === "Destacados") {
        align = "vertical";
      }
      return (
        <FlixSlider
          history={this.props.history}
          section={this.props.home.sections[key]}
          key={key}
          title={key}
          align={align}
          toggleFavorite={this.props.toggleFavorite}
        />
      );
    });
    return (
      <div>
        <StoryList history={this.props.history}/>
        <MainSlider history={this.props.history} />
        <div styleName="container" className="clearfix" />
        {sections}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home
});
const mapDispatchToProps = dispatch => ({
  toggleFavorite: (video, title) => dispatch(toggleFavorite(video, title)),
  fetchHome: () => dispatch(fetchHome())
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  withRef: true
})(DashboardPage);
