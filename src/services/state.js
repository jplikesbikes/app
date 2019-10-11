import { createStore, applyMiddleware } from 'redux';

const initialState = {
	user: {
		name: 'dante',
	},
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

export const store = createStore(reducer, initialState, applyMiddleware(
	// @todo: persistence
	() => (next) => (action) => {
		console.debug('MIDDLEWARE!', { action });
		return next(action);
	},
));
