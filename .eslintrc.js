module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	settings: {
		react: {
			version: '16.4'
		}
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		sourceType: 'module',
		ecmaVersion: 8
	},
	plugins: ['react'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'off'
	}
};
