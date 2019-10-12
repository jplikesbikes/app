export const getSomeData = (max) => {
	const length = Math.min(Math.floor(Math.random() * 10), max);
	const randomData = Array.from({ length }, () => Math.floor(Math.random() * 10));
	return Promise.resolve(randomData);
};

export const saveSaveSomething = () => Promise.reject(Error('You can\'t save anything'));
