import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import css from 'csz';
import { useDispatch, useSelector } from 'react-redux';

import { greeter } from './greet';
import { login, logout } from '../services/state';
import { getSomeData } from '../services/api';

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
		<button onClick=${getData}>Get Date</button>
		<ul>
			${data.map((d) => html`<li>${d}</li>`)}
		</ul>
	</div>`;

// For some better login example
const names = ['jp', 'dante', 'dan', 'phil', 'sanjay'];

// Functional Component with hooks
export const TimeAndCountInternalHooks = (props) => {
	// Local State hooks
	const [time, setTime] = useState(new Date());
	const [count, setCount] = useState(props.initialCount);
	const [data, setData] = useState([]);

	// Change local state
	const increment = () => setCount((c) => c + 1);

	// An "external" effect that changes local state
	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000);

		// on unmount of the component run this function
		return () => clearInterval(timer);

		// You can also read the current value of props in here
		// If you only want to listen to props put them in the array (not tested)
	}, []); // effects run on mount and when the contents of the array change. so in this case only start

	// ------- Redux / Global State
	// Grab user sate from redux, can use a reselect selector here if we want
	const user = useSelector((state) => state.user);

	// Bind login/logout redux disaptch actions
	const dispatch = useDispatch();
	const doLogin = () => dispatch(login({ name: names[Math.floor(Math.random() * names.length)] }));
	const doLogout = () => dispatch(logout());

	// an action that calls an async service
	const getData = () => getSomeData(count).then((result) => {
		// we are setting local state here but we could set global state instead by calling a redux method
		setData(result);
	});

	// Props object for display
	const uiState = {
		// Local-derived
		timeDisplay: new Date(time).toLocaleTimeString(),
		value: count,
		increment,
		// Local Async
		data,
		getData,
		// Global-derived
		user,
		doLogin,
		doLogout,
	};

	return html`<${Layout} ...${uiState} />`;
};
