/**
 * ESLint config for test modules like ava.
 */
module.exports = {
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
    ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'linebreak-style': ['error', 'unix'],
	},
};
