import './index.css';
import { h, Component, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';

// Functional Component
const Hello = ({ name }) => html`<span>Hello ${name}</span>`;

const Layout = ({ time, value, increment }) => html`
	<div>
		It's now: <span>${time}</span>
		<div>Count: ${value}</div>
		<button onClick=${increment}> Increment</button>
	</div>`;

// Class Component
class TimeAndCount extends Component {
	state = {
		time: Date.now(),
		value: 0,
	}

	// Lifecycle: Called whenever our component is created
	componentDidMount() {
		// update time every second
		this.timer = setInterval(() => {
			this.setState((prev) => ({ ...prev, time: Date.now() }));
		}, 1000);
	}

	// Lifecycle: Called just before our component will be destroyed
	componentWillUnmount() {
		// stop when not renderable
		clearInterval(this.timer);
	}

	increment = () => this.setState((prev) => ({ ...prev, value: prev.value + 1 }))

	render() {
		let time = new Date(this.state.time).toLocaleTimeString();
		const state = {
			...this.state,
			time,
			increment: this.increment,
		};
		return html`<${Layout} ...${state} />`;
	}
}

const app = html`
	<div>
		<h1>Preact <${Hello} name="JP" /></h1>
		<${TimeAndCount} />
	</div>`;
render(app, document.body);
