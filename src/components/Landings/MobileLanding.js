import React from "react";

import "./MobileLanding2.css";

export default () => (
	<div styleName="bg">
		<div styleName="header">
			<span styleName="logo" />
		</div>
		<div styleName="preview">
			<span styleName="previewLogo" />
		</div>
		<div styleName="body">
			<div styleName="paragraph">
				<p styleName="title">Descargá la app</p>
				<p styleName="description">
					Puedes tener la app <br />en tu dispositivo <br />
				</p>
				<p styleName="bold">!Que lo disfrutes!</p>
			</div>
		</div>
		<div styleName="icons">
			<p styleName="icon_text">Disponible en:</p>
			<div styleName="stores">
				<button styleName="download_1" />
				<button styleName="download_2" />
			</div>
		</div>
	</div>
);
