const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	...defaultConfig,
	entry: {
		blocks: "./src/blocks/index.js",
		editor: "./src/editor.js",
		frontend: "./src/frontend/index.js",
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, "assets"),
		filename: "js/[name].js",
		assetModuleFilename: "js/[name][ext]",
	},
	plugins: [
		...defaultConfig.plugins.filter(
			(plugin) => !(plugin instanceof MiniCssExtractPlugin),
		),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
	],
};
