import { html } from 'htm/preact';
import { h, Component } from 'preact'; // eslint-disable-line no-unused-vars
import { useState, useEffect } from 'preact/hooks';
import { withEffects, toProps } from 'refract-preact-rxjs';
import { combineLatest, interval } from 'rxjs';
import { map, startWith, scan } from 'rxjs/operators';
import produce from 'immer';
import css from 'csz';

import { greeter } from './greet';

// Layout
export const Hello = ({ name }) => html`<span>${greeter(name)}</span>`;

// unique class name from the loaded file
const layoutClass = css`/components/timeAndCount.scss`;
const Layout = ({ timeDisplay, value, increment }) => html`
	<div class="${layoutClass}">
		It's now: <span>${timeDisplay}</span>
		<div>Count: ${value}</div>
		<button onClick=${increment}> Increment</button>
	</div>`;

// Standard Claas Component
export class TimeAndCount extends Component {
	state = {
		time: Date.now(),
		value: this.props.initialCount,
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
		const uiState = produce(state, (draft) => {
			draft.timeDisplay = new Date(state.time).toLocaleTimeString();
			draft.increment = this.increment;
		});
		return html`<${Layout} ...${uiState} />`;
	}
}

// Refract component
const aperture = (component, initialProps) => {
	const { initialCount } = initialProps;
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

// Functional Component with hooks broken out
const useClock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return time;
};
export const TimeAndCountHooks = (props) => {
	const time = useClock();
	const [count, setCount] = useState(props.initialCount);
	const increment = () => setCount((c) => c + 1);
	const uiState = {
		timeDisplay: new Date(time).toLocaleTimeString(),
		value: count,
		increment,
	};
	return html`<${Layout} ...${uiState} />`;
};

// Functional Component with hooks
export const TimeAndCountInternalHooks = (props) => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => {
			console.log('destroy');
			clearInterval(timer);
		};
	}, []);

	const [count, setCount] = useState(props.initialCount);
	const increment = () => setCount((c) => c + 1);
	const uiState = {
		timeDisplay: new Date(time).toLocaleTimeString(),
		value: count,
		increment,
	};
	return html`<${Layout} ...${uiState} />`;
};
