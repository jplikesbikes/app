import './index.css';
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import { Hello, TimeAndCount, TimeAndCountWithEffects } from './components/timeAndCount';

const app = html`
	<div>
		<h1><${Hello} name="JP" /></h1>
		<h2>Preact</h2>
		<${TimeAndCount} />
		<h2>Refract</h2>
		<${TimeAndCountWithEffects} />
	</div>`;
render(app, document.body);
