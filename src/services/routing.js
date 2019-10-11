import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

const routerOptions = {
	allowNotFound: true,
	autoCleanUp: true,
	defaultRoute: 'home',
	defaultParams: {},
	queryParams: {
		arrayFormat: 'default',
		nullFormat: 'default',
		booleanFormat: 'default',
	},
	queryParamsMode: 'default',
	trailingSlashMode: 'default',
	strictTrailingSlash: false,
	caseSensitive: false,
};

const router = createRouter([{ name: 'err', path: '/err' }], routerOptions);
router.usePlugin(
	browserPlugin({
		useHash: true,
		base: '/sharedState',
	})
);
router.start();

export default router;
