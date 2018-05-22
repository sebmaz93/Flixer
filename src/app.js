import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import configureStore from "./Store/configureStore";
import AppRouter from "./router/AppRouter";

import Amplitude from "react-amplitude";


Amplitude.init("");
//Amplitude.setUserId(jwt.user);

require("!style-loader!css-loader!./j-js/video-js.css");
require("!style-loader!css-loader!./slick-slider/slick-theme.css");
require("!style-loader!css-loader!./slick-slider/slick.css");
// require("!style-loader!css-loader!videojs-sublime-skin/dist/videojs-sublime-skin.min.css");
// require("!style-loader!css-loader!./videoJS_Skin.css");
import "normalize.css/normalize.css";
import "./global.css";
// import "./favicon.ico";

const store = configureStore();
// store.subscribe(() => {
// 	console.log(store.getState());
// });

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

// export default hot(module)(jsx);
ReactDOM.render(jsx, document.getElementById("app"));

