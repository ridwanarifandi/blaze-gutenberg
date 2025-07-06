module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/tests/js/setup.js"],
	testMatch: [
		"<rootDir>/tests/js/**/*.test.js",
		"<rootDir>/tests/js/**/*.spec.js",
	],
	collectCoverageFrom: [
		"assets/js/**/*.js",
		"src/**/*.js",
		"!src/**/*.test.js",
		"!src/**/*.spec.js",
	],
	coverageDirectory: "tests/coverage/js",
	coverageReporters: ["html", "text", "lcov"],
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	transform: {
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	moduleFileExtensions: ["js", "jsx", "json"],
	testPathIgnorePatterns: ["/node_modules/", "/vendor/", "/assets/"],
};
