import css from 'csz';
// N.B. babel preproceses html tag => h() calls during build
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import { Provider } from 'react-redux';
import { Hello } from './components/layout';
import { TimeAndCountInternalHooks } from './components/timeAndCount';
import { TimeAndCountWithEffects } from './components/reactiveComponent';

import { store } from './services/state';


// load css must be absolute path
const appClass = css`/index.css`;

const app = html`
	<${Provider} store='${store}'>
		<div class='${appClass}'>
			<h1><${Hello} name="JP" /></h1>
			<h2>Internal Hooks & Global State</h2>
			<${TimeAndCountInternalHooks} initialCount=${2}/>
			<h2>Refract</h2>
			<${TimeAndCountWithEffects} initialCount=${3}/>
		</div>
	</${Provider}>`;
render(app, document.body);
