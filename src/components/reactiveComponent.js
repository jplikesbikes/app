import { withEffects, toProps } from 'refract-preact-rxjs';
import { combineLatest, interval } from 'rxjs';
import { map, startWith, scan } from 'rxjs/operators';

import { Layout } from './timeAndCount';


// Refract component
export const aperture = (component, initialProps) => {
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
export const handler = (initialProps) => (effect) => {};
export const TimeAndCountWithEffects = withEffects(aperture, { handler })(Layout);
