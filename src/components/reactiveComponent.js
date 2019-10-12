import { withEffects, toProps } from 'refract-rxjs';
import { combineLatest, interval, from } from 'rxjs';
import {
	map, startWith, scan, flatMap,
} from 'rxjs/operators';
import { ReactReduxContext } from 'react-redux';

import { Layout } from './layout';
import { getSomeData } from '../services/api';

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

	return combineLatest(time$, count$, user$, data$).pipe(
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
			doLogin: () => {},
			doLogout: () => {},
		}))
	);
};

// eslint-disable-next-line no-unused-vars
export const handler = (initialProps, { store }) => (effect) => {};
export const TimeAndCountWithEffects = withEffects(aperture, { handler, Context: ReactReduxContext })(Layout);
