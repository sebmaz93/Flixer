import React from "react";
import "./spinner.css";

const Spinner = () => (
	<div styleName="wrapper">
		<h4 styleName="title">CARGANDO</h4>
		<div styleName="lds-ellipsis">
			<div />
			<div />
			<div />
			<div />
		</div>
	</div>
);
export default Spinner;
