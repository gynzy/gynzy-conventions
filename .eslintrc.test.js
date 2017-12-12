module.exports = {
	env: {
		es6: true,
		node: true,
	},
	plugins: ['ava'],
	extends: [
		'eslint:recommended',
		'plugin:ava/recommended',
	],
	parserOptions: {
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
};
