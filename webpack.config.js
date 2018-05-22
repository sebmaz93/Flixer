const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const videojs = require("video.js");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
	require("dotenv").config({ path: "env.development" });
} else if (process.env.NODE_ENV === "production") {
	require("dotenv").config({ path: "env.production" });
}

function getPlugins(env) {
	let plugins = [
		new ErrorOverlayPlugin(),
		new FriendlyErrorsWebpackPlugin(),
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NamedModulesPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.[hash].js",
			minChunks(module) {
				return (
					module.context &&
					module.context.indexOf("node_modules") >= 0
				);
			}
		}),
		new HtmlWebpackPlugin({
			template: __dirname + "/src/index.html",
			filename: "index.html",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: "body"
		}),
		new webpack.ProvidePlugin({
			videojs: "video.js",
			"window.videojs": "video.js"
		}),
		new webpack.DefinePlugin({
			"process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
			"process.env.AUTH_URL": JSON.stringify(process.env.AUTH_URL)
		}),
		new FaviconsWebpackPlugin({
			logo: "./src/favicon.png",
			persistentCache: false,
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: false,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		}),
		new ExtractTextPlugin({
			filename: "[name].[contenthash].css",
			allChunks: true
		})
	];
	if (env) {
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				parallel: true
			})
		);
	}
	return plugins;
}

module.exports = env => {
	const isProduction = env === "production";
	return {
		entry: "./src/app.js",
		output: {
			path: path.join(__dirname, "public"),
			filename: "bundle[hash].js",
			publicPath: "/"
		},
		resolve: {
			extensions: [".js", ".jsx"],
			alias: {
				webworkify: "webworkify-webpack-dropin"
			}
		},
		module: {
			rules: [
				{
					loader: "babel-loader",
					test: /\.js$/,
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{
								loader: "css-loader",
								query: {
									modules: true,
									localIdentName:
										"[path]___[name]__[local]___[hash:base64:5]",
									minimize: true
								}
							},
							{
								loader: require.resolve("postcss-loader"),
								options: {
									ident: "postcss",
									plugins: () => [
										require("postcss-flexbugs-fixes"),
										autoprefixer({
											browsers: [
												">1%",
												"last 4 versions",
												"Firefox ESR",
												"not ie < 9"
											],
											flexbox: "no-2009"
										})
									]
								}
							}
						]
					})
				},
				{
					test: /\.(png|jpe?g|svg|woff|woff2|eot|ttf|gif)$/,
					loader: "url-loader?limit=1000000&name=images/[name].[ext]"
				}
			]
		},
		plugins: getPlugins(env),
		devtool: isProduction ? "source-map" : "inline-source-map",
		devServer: {
			historyApiFallback: true,
			stats: "errors-only",
			open: true,
			quiet: true,
			// hotOnly: true,
			overlay: {
				warnings: true,
				errors: true
			},
			compress: true
		}
	};
};
