import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";
import { facebook, instagram, twitter, linkedin } from "../../assets/IconsSvg";

const Footer = () => (
  <div styleName="footer">
    <div styleName="bar">
      <ul styleName="lista">
        <li>
          <Link to="/terms">Términos y condiciones</Link>
        </li>
      </ul>
      <ul styleName="social">
        <li>
          <a href='https://www.instagram.com/osde' target='_blank'>
            <i styleName="icon insta">{instagram}</i>
          </a>
        </li>
        <li>
          <a href='https://www.facebook.com/grupoosdeoficial' target='_blank'>
            <i styleName="icon face">{facebook}</i>
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/company/osde/' target='_blank'>
            <i styleName="icon face">{linkedin}</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Footer;
