import './index.css';
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import { Hello, TimeAndCountWithEffects } from './components/timeAndCount';

const app = html`
	<div>
		<h1>Refract <${Hello} name="JP" /></h1>
		<${TimeAndCountWithEffects}/>
	</div>`;
render(app, document.body);
