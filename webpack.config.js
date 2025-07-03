const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

module.exports = {
	...defaultConfig,
	entry: {
		blocks: "./src/blocks/index.js",
		editor: "./src/editor.js",
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, "assets/js"),
	},
};
