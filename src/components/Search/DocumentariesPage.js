import React, { Component } from "react";
import { connect } from "react-redux";

import GridVideoList from "../Grids/GridVideoList";
import { toggleFavorite } from "../../Actions/Home_Action";
import "./MainSerachPage.css";

class DocumentariesPage extends Component {
  render() {
    return (
      <div styleName='container'>
        <div styleName="recent">
          <div styleName="heading">
            <h2 styleName="title">Documentales</h2>
          </div>
          <GridVideoList
            items={this.props.videos}
            toggleFavorite={this.props.toggleFavorite}
            title={"Documentales"}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  videos: state.home.sections.Documental
});
const mapDispatchToProps = dispatch => ({
  toggleFavorite: (video, title) => dispatch(toggleFavorite(video, title))
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  withRef: true
})(DocumentariesPage);
