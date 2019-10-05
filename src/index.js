import './index.css';
import { h, Component, render } from 'preact'; // eslint-disable-line no-unused-vars
import { html } from 'htm/preact';

// Functional Component
const Hello = (props) => html`<span>Hello ${props.name}</span>`;

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
		return html`<div>
			It's now: <span>${time}</span>
			<div>Count: ${this.state.value}</div>
			<button onClick=${this.increment}> Increment</button>
		</div>`;
	}
}

const app = html`
	<div>
		<${Hello} name="JP" />
		<br/>
		<${TimeAndCount} />
	</div>`;
render(app, document.body);
