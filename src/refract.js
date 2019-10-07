import css from 'csz';
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import { Hello, TimeAndCountWithEffects } from './components/timeAndCount';

// load css must be absolute path
const appClass = css`/index.css`;

const app = html`
	<div class='${appClass}'>
		<h1>Refract <${Hello} name="JP" /></h1>
		<${TimeAndCountWithEffects}/>
	</div>`;
render(app, document.body);
