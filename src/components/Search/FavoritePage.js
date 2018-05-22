import React, { Component } from "react";
import { connect } from "react-redux";

import "./FavoritePage.css";
import { removeFavorite } from "../../Actions/Home_Action";
import { fetchFavoriteVideos } from "../../Actions/FavoriteList_Action";
import FavoriteGridVideoList from "../Grids/FavoriteGridVideoList";
import Spinner from "../Spinner/spinner";
import Amplitude from "react-amplitude";

class FavoritePage extends Component {
  initalizeData = () => {
    this.props.fetchFavoriteVideos();
  };
  render() {
    Amplitude.logEvent("Screen_Favorites");
    return (
      <div styleName='container'>
        <div styleName="myListPage">
          <h2 styleName="title">Favoritos</h2>
          <FavoriteGridVideoList
            removeFavorite={this.props.removeFavorite}
            items={this.props.favoriteList}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  favoriteList: state.favoriteList
});
const mapDispatchToProps = dispatch => ({
  removeFavorite: id => dispatch(removeFavorite(id)),
  fetchFavoriteVideos: () => dispatch(fetchFavoriteVideos())
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  withRef: true
})(FavoritePage);
