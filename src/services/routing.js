import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { from } from 'rxjs';

const routerOptions = {
	allowNotFound: true,
	autoCleanUp: true,
	defaultRoute: 'home',
	defaultParams: {},
	queryParams: {
		arrayFormat: 'default',
		nullFormat: 'default',
		booleanFormat: 'default'
	},
	queryParamsMode: 'default',
	trailingSlashMode: 'default',
	strictTrailingSlash: false,
	caseSensitive: false
}
export const router = createRouter([{ name: 'err', path: '/err'}], routerOptions)
router.usePlugin(
	browserPlugin({
		useHash: true,
		base: '/sharedState'
	})
)
router.start()

