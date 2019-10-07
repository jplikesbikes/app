import { html } from 'htm/preact';
import { h, Component } from 'preact'; // eslint-disable-line no-unused-vars
import { withEffects, toProps } from 'refract-preact-rxjs';
import { combineLatest, interval } from 'rxjs';
import { map, startWith, scan } from 'rxjs/operators';
import produce from 'immer';

import { greeter } from './greet';

// Layout
export const Hello = ({ name }) => html`<span>${greeter(name)}</span>`;
const Layout = ({ timeDisplay, value, increment }) => html`
	<div>
		It's now: <span>${timeDisplay}</span>
		<div>Count: ${value}</div>
		<button onClick=${increment}> Increment</button>
	</div>`;

// Standard Claas Component
export class TimeAndCount extends Component {
	state = {
		time: Date.now(),
		value: 3,
	}

	// Only run the timer while the component is on the screen
	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState(produce((draft) => { draft.time = Date.now(); }));
		}, 1000);
	}

	// Clear the timer when we are off the screen
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	increment = () => this.setState(produce((draft) => { draft.value += 1; }))

	render(props, state) {
		const newProps = produce(state, (draft) => {
			draft.timeDisplay = new Date(state.time).toLocaleTimeString();
			draft.increment = this.increment;
		});
		return html`<${Layout} ...${newProps} />`;
	}
}

// Refract component
const aperture = (component) => {
	const initialCount = 3;
	const [increment$, increment] = component.useEvent('increment');
	const count$ = increment$.pipe(
		scan((count) => count + 1, initialCount),
		startWith(initialCount)
	);

	const time$ = interval(1000).pipe(
		map(() => Date.now()),
		startWith(Date.now())
	);

	return combineLatest(time$, count$).pipe(
		map(([time, count]) => toProps({
			timeDisplay: new Date(time).toLocaleTimeString(),
			value: count,
			increment,
		}))
	);
};
// eslint-disable-next-line no-unused-vars
const handler = (initialProps) => (effect) => {};
export const TimeAndCountWithEffects = withEffects(aperture, { handler })(Layout);
