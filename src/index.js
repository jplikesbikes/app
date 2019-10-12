import css from 'csz';
// N.B. babel preproceses html tag => h() calls during build
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import { Provider } from 'react-redux';
import {
	Hello, TimeAndCountInternalHooks,
} from './components/timeAndCount';

import { store } from './services/state';


// load css must be absolute path
const appClass = css`/index.css`;

const app = html`
	<${Provider} store='${store}'>
		<div class='${appClass}'>
			<h1><${Hello} name="JP" /></h1>
			<h2>Internal Hooks & Global State</h2>
			<${TimeAndCountInternalHooks} initialCount=${2}/>
		</div>
	</${Provider}>`;
render(app, document.body);
