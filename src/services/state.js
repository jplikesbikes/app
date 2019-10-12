import { createStore, applyMiddleware, compose } from 'redux';
import { refractEnhancer } from 'refract-redux-rxjs';

const initialState = {
	user: { name: 'dante' },
};

export const logout = () => ({ type: 'LOGOUT' });
export const login = (payload) => ({ type: 'LOGIN', payload });

export const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGOUT':
			return { ...state, user: undefined };
		case 'LOGIN':
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

const middlewareEnhancer = applyMiddleware(
	// @todo: persistence
	() => (next) => (action) => {
		console.debug('MIDDLEWARE!', { action }); // eslint-disable-line no-console
		return next(action);
	},
);

const composedEnhancers = compose(
	middlewareEnhancer,
	refractEnhancer(),
);

export const store = createStore(reducer, initialState, composedEnhancers);
