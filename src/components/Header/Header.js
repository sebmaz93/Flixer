import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSubtitle } from "../../Actions/Subtitle_Action";
import { logout } from "../../Actions/Auth_Action";
import { setSearchText, fetchSearchContent } from "../../Actions/Search_Action";

import "./Header.css";
import { ProfileDD, NotificationDD } from "./DD";
import qboLogo from "../../assets/qbo-logo.png";
import {
  notificationIcon,
  profileIcon,
  searchIcon
} from "../../assets/IconsSvg";

class Header extends Component {
  state = {
    dropDown: "",
    categories: [
      'Salud y bienestar',
      'Arte y Cultura',
      'Tecnología',
      'Medioambiente',
      'Turismo',
      'RSE',
      'Regiones',
      'Noticias y actualidad',
      'Institucional',
      'Seguros'
    ],
    placeholder: ''
  };

  changePlaceholder = () => {
    setInterval(() =>{
      let randomNumber = Math.round(Math.random() * (this.state.categories.length - 1) * 1);
      let randomCategory = this.state.categories[randomNumber]
      this.setState({
        placeholder: randomCategory
      })
    },2000)
  }

  changeSearchText = e => {
    this.props.setSearchText(e.target.value);
  };

  submitSearchText = e => {
    if (e.key === "Enter") {
      this.props.fetchSearchContent(this.props.searchText);
      this.props.history.push(`/search/${this.props.searchText}`);
    }
  };

  componentWillMount(){
    this.changePlaceholder();
  }

  render() {
    return (
      <header styleName="bar">
        <NavLink to="/dashboard">
          <img src={qboLogo} alt="Plix Logo" styleName="logo" />
        </NavLink>
        <ul styleName="navList">
          <li>
            <NavLink
              to="/dashboard"
              activeClassName="isActive"
              styleName="navItem"
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/highlights"
              activeClassName="isActive"
              styleName="navItem"
            >
              Destacados
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/documentaries"
              activeClassName="isActive"
              styleName="navItem"
            >
              Documentales
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorite"
              activeClassName="isActive"
              styleName="navItem"
            >
              Favoritos
            </NavLink>
          </li>
        </ul>
        <ul styleName="icons">
          <li>
            <div styleName="searchBox">
              <input
                styleName="searchText"
                type="text"
                value={this.props.searchText}
                onChange={this.changeSearchText}
                onKeyPress={this.submitSearchText}
                placeholder={this.state.placeholder + '...'}
              />

              <div styleName="searchIcon">
                <i styleName="icon">{searchIcon}</i>
              </div>
            </div>
          </li>
          <li>
            <div styleName="icon notificationIcon" tabIndex="-1">
              {notificationIcon}
              <div styleName="notification">
                <NotificationDD dropDown={this.state.dropDown} />
              </div>
            </div>
          </li>
          <li>
            <div styleName="icon profileIcon" tabIndex="-1">
              {profileIcon}
              <div styleName="profile">
                <ProfileDD
                  toggleSubtitle={this.props.toggleSubtitle}
                  subtitle={this.props.subtitle}
                  logout={this.props.logout}
                />
              </div>
            </div>
          </li>
        </ul>
      </header>
    );
  }
}
const mapStateToProps = state => ({
  subtitle: state.subtitle,
  searchText: state.search.searchText
});
const mapDispatchToProps = dispatch => ({
  toggleSubtitle: () => dispatch(toggleSubtitle()),
  logout: () => dispatch(logout()),
  setSearchText: text => dispatch(setSearchText(text)),
  fetchSearchContent: query => dispatch(fetchSearchContent(query))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps, null, {
    pure: false
  })(Header)
);
