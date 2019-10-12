import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';

import { login, logout } from '../services/state';
import { getSomeData } from '../services/api';
import { Layout } from './layout';


// For some better login example
export const names = ['jp', 'dante', 'dan', 'phil', 'sanjay'];

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
	// Remove the array and it runs on mount and all updates

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
