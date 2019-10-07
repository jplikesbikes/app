import css from 'csz';
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import { Hello, TimeAndCount, TimeAndCountWithEffects } from './components/timeAndCount';

// load css must be absolute path
const appClass = css`/index.css`;

const app = html`
	<div class='${appClass}'>
		<h1><${Hello} name="JP" /></h1>
		<h2>Preact</h2>
		<${TimeAndCount} />
		<h2>Refract</h2>
		<${TimeAndCountWithEffects} />
	</div>`;
render(app, document.body);
