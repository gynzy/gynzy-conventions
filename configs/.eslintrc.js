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
	},
	rules: {
		'linebreak-style': ['error', 'unix'],
		'valid-jsdoc': ['error'],
		'require-jsdoc': ['error', {
			'require': {
				'FunctionDeclaration': true,
				'MethodDefinition': true,
				'ClassDeclaration': true
			}
		}],
		'max-statements': ['error', 20],
		complexity: ['error', 10],
		'max-depth': ['error', 5],
		'max-params': ['error', 5],
		'require-await': ['error'],
		'prefer-arrow-callback': ['error'],
		'no-param-reassign': ['error'],
		'no-var': ['error'],
		'prefer-const': ['error'],
		'one-var-declaration-per-line': ['error'],
	},
};
