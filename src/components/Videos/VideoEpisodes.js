import React, { Component } from "react";
import { connect } from "react-redux";

import { addFavorite, deleteFavorite } from "../../Actions/FavoriteList_Action";
import EpisodesSlider from "../Slider/EpisodsSlider";

import "./VideoEpisodes.css";
import { arrowLeftIcon, arrowRightIcon } from "../../assets/IconsSvg";

class Episodes extends Component {
  state = {
    index: 0
  };
  toggleFavorite = (id, isFavorite) => {
    if (isFavorite) {
      this.props.deleteFavorite(id, this.state.index);
    } else {
      this.props.addFavorite(id, this.state.index);
    }
  };
  render() {
    // console.log(this.props.seasons);
    return (
      <div styleName="epi_main">
        <EpisodesSlider
          section={this.props.seasons[this.state.index].chapters}
          title="Episodes"
          openPlayer={this.props.openPlayer}
          toggleFavorite={this.toggleFavorite}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  addFavorite: (id, season) => dispatch(addFavorite(id, season)),
  deleteFavorite: (id, season) => dispatch(deleteFavorite(id, season))
});
export default connect(undefined, mapDispatchToProps)(Episodes);
