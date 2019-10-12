import { html } from 'htm/preact';
import css from 'csz';
import { greeter } from './greet';

// Layout
export const Hello = ({ name }) => html`<span>${greeter(name)}</span>`;

// unique class name from the loaded file
const layoutClass = css`/components/timeAndCount.scss`;
export const Layout = ({
	timeDisplay, value, increment,
	user, doLogin, doLogout, data, getData,
}) => html`
	<div class="${layoutClass}">
		${
	user
		? html`<div><button onClick=${doLogout}> Logout.</button> Hello, ${user.name}!</div>`
		: html`<div><button onClick=${doLogin}>Login.</button></div>`
}
		It's now: <span>${timeDisplay}</span>
		<div>Count: ${value}</div>
		<button onClick=${increment}>Increment</button>
		<button onClick=${getData}>Get Data</button>
		<ul>
			${data && data.map((d) => html`<li>${d}</li>`)}
		</ul>
	</div>`;
