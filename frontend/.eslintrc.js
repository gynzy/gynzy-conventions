module.exports = {
	root: true,
	plugins: ['ember'],
	extends: ['eslint:recommended', 'plugin:ember/recommended'],
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
	},
	env: {
		browser: true,
	},
	rules: {
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'eol-last': 'warn',
		'ember/no-old-shims': 'error',
		'ember/no-global-jquery': ['off'],
		'ember/jquery-ember-run': ['off'],
		'ember/closure-actions': ['off'],
		'ember/routes-segments-snake-case': ['off'],
		'ember/avoid-leaking-state-in-ember-objects': ['warn'],

		'no-var': ['error'],
		'prefer-const': ['error'],
	},
};
