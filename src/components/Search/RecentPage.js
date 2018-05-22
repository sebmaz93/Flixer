import React, { Component } from "react";
import { connect } from "react-redux";

import GridVideoList from "../Grids/GridVideoList";
import { toggleFavorite } from "../../Actions/Home_Action";
import "./MainSerachPage.css";

class RecentPage extends Component {
  render() {
    return (
      <div styleName="recent">
        <div styleName="heading">
          <span styleName="backButton" />
          <h2 styleName="title">Novedades</h2>
        </div>
      </div>
    );
  }
}
export default RecentPage;
