/**
 * ESLint config for main code modules.
 */
module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 8,
		ecmaFeatures: {
			"experimentalObjectRestSpread": true
		},
	},
	rules: {
		'linebreak-style': ['warn', 'unix'],
		'valid-jsdoc': ['warn'],
		'require-jsdoc': [
			'warn',
			{
				require: {
					FunctionDeclaration: true,
					MethodDefinition: true,
					ClassDeclaration: true,
				},
			},
		],
		'max-statements': ['warn', 20],
		'complexity': ['warn', 10],
		'max-depth': ['warn', 5],
		'max-params': ['warn', 5],
		'require-await': ['warn'],
		'prefer-arrow-callback': ['warn'],
		'no-param-reassign': ['warn'],
		'no-var': ['warn'],
		'prefer-const': [
			'warn',
			{
				destructuring: 'all',
			},
		],
		'one-var-declaration-per-line': ['warn'],
		'no-return-await': ['warn'],
		'prettier/prettier': ['warn'],
	},
};
