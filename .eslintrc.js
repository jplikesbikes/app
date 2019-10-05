'use strict';
module.exports = {
	extends: 'airbnb/base',
	root: true,
	plugins: [
		"@typescript-eslint",
	],
	parser: "babel-eslint",
	rules: {
		// use tabs only
		'no-tabs': [0],
		indent: [2, 'tab', { SwitchCase: 1 }],

		// use one space anywhere we allow space
		'no-multi-spaces': [2],

		// no spaces before a functions parameters.
		// good => `function add(a, b){ ... }`
		// bad => `function add (a, b){ ... }`
		'space-before-function-paren': [2],

		// error if we are reassigning function parameters,
		// allow reassigning props of parameters
		'no-param-reassign': [2, { 'props': false }],

		// warn when you don't dangle a comma in a multiline object or array def
		'comma-dangle': [1, 'always-multiline'],

		// use whatever block padding you want
		'padded-blocks': [0],

		// only provide a radix to parseInt if it is not 10
		radix: [2, 'as-needed'],

		// set max line length to a more reasonable number
		'max-len': [2, 120, {
			ignoreComments: true,
			ignoreUrls: true,
			tabWidth: 1,
		}],

		//            dv-js specific            //
		'new-cap': [2, {
			properties: false, // @todo: would rather be capIsNewExceptionPattern for UTC* fns
		}],

		// Allow for single-line getters & setters
		'no-return-assign': [2, 'except-parens'],

		// dv-js doesn't care about var/let/const
		'no-var': [0],
		'prefer-const': [0, {
			// If EVERY thing can be 'const' in a destructure, then trigger
			destructuring: 'all',
		}],

		// Don't assign in a condition check `if (x = 10)`, unless you wrap in extra parens for intention
		// ie: while ((x = test()) { ... } is okay
		'no-cond-assign': [2, 'except-parens'],

		// Too many files have vars scattered around
		'vars-on-top': [0],
		'one-var': [0],
		'one-var-declaration-per-line': [0],

		// @todo: move these back to warnings -- suppressed for now because output
		// allow mutable exports
		'import/no-mutable-exports': [0],

		'no-underscore-dangle': [1],

		// dv-js makes too many anon function(){}
		'func-names': [0],

		// Dunno how better to do this in some cases?
		'no-loop-func': [0],
	},
	env: {
		mocha: true,
		browser: true,
	}
};
