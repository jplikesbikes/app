import css from 'csz';
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import {
	Hello, TimeAndCount, TimeAndCountWithEffects, TimeAndCountHooks, TimeAndCountInternalHooks,
} from './components/timeAndCount';

// load css must be absolute path
const appClass = css`/index.css`;

const app = html`
	<div class='${appClass}'>
		<h1><${Hello} name="JP" /></h1>
		<h2>Preact</h2>
		<${TimeAndCount} initialCount=${3} />
		<h2>Refract</h2>
		<${TimeAndCountWithEffects} initialCount=${4} />
		<h2>Abstracted hook</h2>
		<${TimeAndCountHooks} initialCount=${5} />
		<h2>Internal hook</h2>
		<${TimeAndCountInternalHooks} initialCount=${6} />
	</div>`;
render(app, document.body);
