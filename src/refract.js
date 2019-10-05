import './index.css';
import { h, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';
import { withEffects, toProps } from 'refract-preact-rxjs';
import { combineLatest, interval } from 'rxjs';
import { map, startWith, scan } from 'rxjs/operators';

// Functional Component
const Hello = (props) => html`<span>Hello ${props.name}</span>`;

const aperture = (component) => {
	const initialCount = 3;
	const [increment$, increment] = component.useEvent('increment');
	const count$ = increment$.pipe(
		scan((count) => count + 1, initialCount),
		startWith(initialCount)
	);

	const time$ = interval(1000).pipe(
		map(() => new Date(Date.now()).toLocaleTimeString()),
		startWith(new Date(Date.now()).toLocaleTimeString())
	);

	return combineLatest(time$, count$).pipe(
		map(([time, count]) => toProps({
			timeDisplay: time,
			value: count,
			increment,
		}))
	);
};

// eslint-disable-next-line no-unused-vars
const handler = (initialProps) => (effect) => {};
const TimeAndCountInner = ({ timeDisplay, value, increment }) => html`
	<div>
		It's now: <span>${timeDisplay}</span>
		<div>Count: ${value}</div>
		<button onClick=${increment}> Increment</button>
	</div>`;
const TimeAndCountWithEffects = withEffects(aperture, { handler })(TimeAndCountInner);


const app = html`
	<div>
		<h1>Refract <${Hello} name="JP" /></h1>
		<${TimeAndCountWithEffects}/>
	</div>`;
render(app, document.body);
