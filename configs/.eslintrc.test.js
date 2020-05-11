/**
 * ESLint config for test modules like ava.
 */
module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	plugins: ['ava'],
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:ava/recommended',
	],
	parserOptions: {
		sourceType: 'module',
	},
	rules: {
		'linebreak-style': ['error', 'unix'],
	},
};
