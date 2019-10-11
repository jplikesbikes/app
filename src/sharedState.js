import css from 'csz';
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import browserPlugin from 'router5-plugin-browser'

import { router } from './services/routing';


// add in this page
router.add({ name: 'home', path: '/asd' });
router.navigate('home')


// load css must be absolute path
const appClass = css`/index.css`;

const app = html`
	<div class='${appClass}'>

	</div>`;
render(app, document.body);
