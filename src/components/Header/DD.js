import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./DD.css";
import { close } from "../../assets/IconsSvg";
import osdeLogo from "../../assets/osde_logo.png";

export const ProfileDD = props => (
  <div styleName="profile">
    <ul styleName="pLista">
      <li styleName="pListaItem">Subtítulos</li>
      <span styleName="card">
        <label htmlFor="switch2">
          <input
            styleName="input"
            type="checkbox"
            id="switch2"
            value={props.subtitle}
            onChange={props.toggleSubtitle}
          />
          <span styleName="switch" />
          <span styleName="toggle" />
        </label>
      </span>
      <li styleName="pListaItem">
        <span
          onClick={() => {
            props.logout();
          }}
        >
          Cerrar sesión
        </span>
      </li>
    </ul>
  </div>
);

/*
export class NotificationDD extends Component {
  renderNotifications = () => {
    this.props.notifications.map(notification => {
      return (
        <li key={notification.id} styleName="nListaItem">
        <i styleName="close">{close}</i>
          <p styleName="date">{notification.date}</p>
          <h4 styleName="title">{notification.title}</h4>
          <p styleName="description">{notification.description}</p>
        </li>
      );
    });
  };
  render() {
    return (
      <div styleName="notifications">
        <h3 styleName="heading">Notificaciones</h3>
        <ul styleName="nLista">{renderNotifications}</ul>
      </div>
    );
  }
}
*/

// STATIC JUST FOR TEST DELETE AFTER !!!
export const NotificationDD = props => (
  <div styleName="notifications">
    <ul styleName="nLista">
      <li styleName="nListaItem">
        <div styleName="nListaItemInner">
          <div styleName="notifDetails">
            <h4 styleName="title">OSDE</h4>
            <p styleName="description">las nuevas sedes</p>
            <div styleName="date">hace 20 minutos</div>
          </div>
          <i styleName="close">{close}</i>
          <span styleName='new'></span>
          <span styleName="seeNotif"></span>
        </div>
      </li>
      <li styleName="nListaItem">
        <div styleName="nListaItemInner old">
          <div styleName="notifDetails">
            <h4 styleName="title">HOMENAJE A LAS COMUNIDADES</h4>
            <p styleName="description">nuevos episodios</p>
            <date styleName="date">hace 2 horas</date>
          </div>
          <span styleName='seen'></span>
          <i styleName="close">{close}</i>
        </div>
      </li>
      <li styleName="nListaItem">
        <div styleName="nListaItemInner old">
          <div styleName="notifDetails">
            <h4 styleName="title">FUNDACION OSDE</h4>
            <p styleName="description">Inauguración de muestra</p>
            <date styleName="date">hace 1 día</date>
          </div>
          <i styleName="close">{close}</i>
          <span styleName='seen'></span>
        </div>
      </li>
    </ul>
    <div styleName="seeAllNotif" />
  </div>
);
