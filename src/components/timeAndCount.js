import { html } from 'htm/preact';
// N.B. babel preproceses html tag => h() calls during build
import { h } from 'preact'; // eslint-disable-line no-unused-vars
import { useState, useEffect } from 'preact/hooks';
import { withEffects, toProps } from 'refract-preact-rxjs';
import { combineLatest, interval } from 'rxjs';
import { map, startWith, scan } from 'rxjs/operators';
import css from 'csz';

import { useDispatch, useSelector } from 'react-redux';
import { greeter } from './greet';
import { login, logout } from '../services/state';

// Layout
export const Hello = ({ name }) => html`<span>${greeter(name)}</span>`;

// unique class name from the loaded file
const layoutClass = css`/components/timeAndCount.scss`;
const Layout = ({
	timeDisplay, value, increment, setInitialCount,
	user, doLogin, doLogout,
}) => html`
	<div class="${layoutClass}">
		${
	user
		? html`<div>Hello, ${user.name}! <button onClick=${doLogout}> Logout.</button></div>`
		: html`<button onClick=${doLogin}>Login.</button>`
}
		It's now: <span>${timeDisplay}</span>
		<div>Count: ${value}</div>
		<button onClick=${increment}> Increment</button>
		${setInitialCount && html`<button onClick=${setInitialCount}>Set Initial to 5</button>`}
	</div>`;

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


// For some better login example
const names = ['jp', 'dante', 'dan', 'phil', 'sanjay'];

// Functional Component with hooks
export const TimeAndCountInternalHooks = (props) => {
	// Local State hooks
	const [time, setTime] = useState(new Date());
	const [count, setCount] = useState(props.initialCount);

	// Change local state
	const increment = () => setCount((c) => c + 1);

	// An "external" effect that changes local state
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		// on destroy
		return () => {
			clearInterval(timer);
		};
	}, []);

	// ------- Redux / Global State
	// Grab user sate fromredux
	const user = useSelector((state) => state.user);

	// Bind login/logout disaptch actions
	const dispatch = useDispatch();
	const doLogin = () => dispatch(login({ name: names[Math.floor(Math.random() * names.length)] }));
	const doLogout = () => dispatch(logout());

	// Props object for display
	const uiState = {
		// Local-derived
		timeDisplay: new Date(time).toLocaleTimeString(),
		value: count,
		increment,
		// Global-derived
		user,
		doLogin,
		doLogout,
	};

	return html`<${Layout} ...${uiState} />`;
};
