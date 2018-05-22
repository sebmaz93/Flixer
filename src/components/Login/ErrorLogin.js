import React from "react";

import "./ErrorLogin.css";

const ErrorLogin = props => (
  <div>
    <div styleName="container">
      <div styleName="head">
        <p styleName="header">{props.errorMessage.title}</p>

        <button styleName="close" onClick={props.handleClose}>
          X
        </button>
      </div>

      <div styleName="body">
        <p styleName="text">{props.errorMessage.description}</p>
      </div>
    </div>
  </div>
);

export default ErrorLogin;
