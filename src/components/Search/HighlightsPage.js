import React, { Component } from "react";
import { connect } from "react-redux";

import GridVideoList from "../Grids/GridVideoList";
import { toggleFavorite } from "../../Actions/Home_Action";

import "./MainSerachPage.css";

class HighlightsPage extends Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="recent">
          <div styleName="heading">
            <h2 styleName="title">Destacados</h2>
          </div>
          <GridVideoList
            items={this.props.videos}
            toggleFavorite={this.props.toggleFavorite}
            title={"Destacados"}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  videos: state.home.sections.Destacados
});
const mapDispatchToProps = dispatch => ({
  toggleFavorite: (video, title) => dispatch(toggleFavorite(video, title))
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  withRef: true
})(HighlightsPage);
