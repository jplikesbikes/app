module.exports = {
	parser: false,
	plugins: {
		// Note on ordering: They claim declaration order, which is awkward for objects...
		// Order matters in this object!!!
		// @see: https://github.com/michael-ciniawsky/postcss-load-config#ordering
		'postcss-import': {}, // import plugin first!!! this is so other plugins are seen after import.
		'postcss-nested': {}, // nesting next, so our imports are followed.
		'postcss-preset-env': {},
	},
};
