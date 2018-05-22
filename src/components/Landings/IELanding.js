import React from "react";

import osdeLogo from "../../assets/qbo-logo.png";
import IE from "../../assets/IE.png";
import "./IELanding.css";

export default () => (
	<div>
		<div styleName="background overlay">
			<div styleName="vector">
				<img src={IE} alt="vector" />
			</div>
			<div styleName="card">
				<div styleName="logoImg">
					<img src={osdeLogo} alt="Background" styleName="" />
				</div>
				<p styleName="title">
					Esta aplicación <br /> no es compatible con tu navegador,{" "}
					<br /> te recomendamos el uso de <br />
					<b>GOOGLE CHROME</b>
				</p>
				<p styleName="smallText">también disponible en:</p>
				<button styleName="btn">Apple Store / Play Store</button>
			</div>
		</div>
	</div>
);
