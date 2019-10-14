import css from 'csz';
// N.B. babel preproceses html tag => h() calls during build
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider, useRoute } from 'react-router5';

import { Hello } from './components/layout';
import { TimeAndCountInternalHooks } from './components/timeAndCount';
import { TimeAndCountWithEffects } from './components/reactiveComponent';
import Nav from './components/nav';
import router from './services/routing';
import { store } from './services/state';

router.add([
	{
		name: 'hooks',
		path: 'hooks',
	},
	{
		name: 'refract',
		path: 'refract',
	},
]);

// load css must be absolute path
const appClass = css`/index.css`;

const ShowRoute = ({ routeName, children }) => {
	const route = useRoute();
	const currentRouteName = route && route.route && route.route.name;
	const view = routeName === currentRouteName ? children : null;
	return view;
};

const HelloUser = () => {
	const name = useSelector((state) => (state.user && state.user.name) || 'world');
	return html`<${Hello} name=${name}/>`;
};

const app = html`
	<${Provider} store='${store}'>
		<${RouterProvider} router=${router}>
			<div class='${appClass}'>
				<h1><${HelloUser} /></h1>
				<${Nav}/>
				<${ShowRoute} routeName='hooks'>
					<h2>Internal Hooks & Global State</h2>
					<${TimeAndCountInternalHooks} initialCount=${2}/>
				</${ShowRoute}>
				<${ShowRoute} routeName='refract'>
					<h2>Refract</h2>
					<${TimeAndCountWithEffects} initialCount=${3}/>
				</${ShowRoute} >
			</div>
		</${RouterProvider}>
	</${Provider}>`;
render(app, document.body);
