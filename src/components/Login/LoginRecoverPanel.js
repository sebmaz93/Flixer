import React from "react";
import { GoogleLogin } from "react-google-login";
import googlePng from "../../assets/Google.png";
import "./LoginRecoverPanel.css";

export const LoginPanel = props => (
  <div>
    <div styleName="body">
      <div styleName="message">CONECTATE PARA COMENZAR A DISFRUTAR</div>
      <GoogleLogin
        styleName="btn red"
        clientId="371891199632-i5ol83kvehe0qnvqffhg8crejjetaqh2.apps.googleusercontent.com"
        buttonText="INGRESAR CON GOOGLE"
        onSuccess={props.successGoogle}
        onFailure={props.failureGoogle}
      />
    </div>
  </div>
);

// export const RecoverPanel = () => (
//   <div>
//     <h1 styleName="header">Recuperar contraseña</h1>
//     <div styleName="body">
//       <p styleName="text">
//         Por favor ingresa tu email para enviarte las instrucciones para
//         recuperar tu contraseña
//       </p>
//       <input styleName="input" type="text" placeholder="Email" />
//       <button
//         styleName="btn blue"
//         style={{ background: `url(${googlePng}) 20% 50% no-repeat` }}
//       >
//         Enviar
//       </button>
//     </div>
//   </div>
// );
