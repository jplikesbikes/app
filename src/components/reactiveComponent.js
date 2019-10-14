import { withEffects, toProps } from 'refract-rxjs';
import {
	combineLatest, interval, from, merge,
} from 'rxjs';
import {
	map, startWith, scan, flatMap, mapTo,
} from 'rxjs/operators';
import { ReactReduxContext } from 'react-redux';

import { Layout } from './layout';
import { getSomeData } from '../services/api';
import { login, logout } from '../services/state';

// For some better login example
const names = ['jp', 'dante', 'dan', 'phil', 'sanjay'];

const reduxEffect = (payload) => ({ type: 'redux', payload });

// Refract component
export const aperture = (component, { initialCount }, { store }) => {
	// Global State
	const user$ = store.observe((state) => state.user);

	// Local async state
	const [getData$, getData] = component.useEvent('getData', undefined);
	const data$ = getData$.pipe(flatMap((count) => from(getSomeData(count))));

	// Local state
	const [increment$, increment] = component.useEvent('increment', initialCount);
	const count$ = increment$.pipe(scan((count) => count + 1));

	const time$ = interval(1000).pipe(
		map(() => Date.now()),
		startWith(Date.now())
	);

	// Bind login/logout redux disaptch actions
	const [login$, doLogin] = component.useEvent('login');
	const [logout$, doLogout] = component.useEvent('logout');

	const props = combineLatest(time$, count$, user$, data$).pipe(
		map(([time, count, user, data]) => toProps({
			// Local-derived
			timeDisplay: new Date(time).toLocaleTimeString(),
			value: count,
			increment,
			// Local Async
			data,
			getData: () => getData(count),
			// Global-derived
			user,
			doLogin,
			doLogout,
		}))
	);

	const effects$ = merge(
		login$.pipe(mapTo(reduxEffect(login({ name: names[Math.floor(Math.random() * names.length)] })))),
		logout$.pipe(mapTo(reduxEffect(logout())))
	);

	return merge(props, effects$);
};

// Handler should be global to the app
export const handler = (initialProps, { store }) => (effect) => {
	if (effect.type === 'redux') {
		store.dispatch(effect.payload);
	}
};
export const TimeAndCountWithEffects = withEffects(aperture, { handler, Context: ReactReduxContext })(Layout);
