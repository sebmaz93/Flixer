import React, { Component } from "react";
import { connect } from "react-redux";

import GridVideoList from "../Grids/GridVideoList";
import "./MainSerachPage.css";

class SearchPage extends Component {

  state = {
    searchField: ''
  }

  getSearchField = () => {
    let search = window.location.href.split('/');
    this.setState({
      searchField: search[4]
    })
  }

  componentWillMount(){
    this.getSearchField()
  }

  render() {
    return (
      <div styleName='container'>
        <div styleName="searchPage">
          <div styleName="heading">
            <h2 styleName="title">
              {
                this.props.searchContent.length ?
                "Búsqueda"
                : <i>Búsqueda: {this.state.searchField}</i>
              }
            </h2>
          </div>
          <div>
            {
              this.props.searchContent.length ?
              <GridVideoList items={this.props.searchContent} title={"search"} />
              : <h2>No hay resultados para tu búsqueda.</h2>
            }

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchContent: state.search.content
});
export default connect(mapStateToProps, null, null, { withRef: true })(
  SearchPage
);
