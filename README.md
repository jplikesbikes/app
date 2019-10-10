# app

Install `lit-plugin` for vscode to get highlighting and checking of ` html` blocks


## React gotchas
+ Props are readonly and only set by the parent component on the child (doc)[https://reactjs.org/docs/components-and-props.html#props-are-read-only]
+ State Updates May Be Asynchronous (docs)[https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous]
+ State Updates are shallow merged (docs)[https://reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged]
+ Event handlers can't return `false` to `preventDefault` they must call `e.preventDefault();` (docs)[https://reactjs.org/docs/handling-events.html]
+ Event handlers need to bind `this` if it is used ofr instance in class components(docs)[https://reactjs.org/docs/handling-events.html] correct with one of the following
	- this.handleClick = this.handleClick.bind(this);
	- ```
		class LoggingButton extends React.Component {
			// This syntax ensures `this` is bound within handleClick.
			// Warning: this is *experimental* syntax.
			handleClick = () => {
				console.log('this is:', this);
			}
		}
	```
+ Conditional Rendering - if a compenonet returns `null` it is not renders but its lifecycle methods are still called (doc)[https://reactjs.org/docs/conditional-rendering.html#preventing-component-from-rendering]
+ Lists of components are renders using curly braces `{}` ex `<ul>{listOfLis}</ul>` a `key` attribute is used to check identity (doc)[https://reactjs.org/docs/lists-and-keys.html#keys]
+ By default form elements are `controlled` to be more react like (doc)[https://reactjs.org/docs/forms.html#controlled-components]
+ Gross! Lifting state - Share state between components by keeping it a parent and passing it to children via props (doc)[https://reactjs.org/docs/lifting-state-up.html]
+ Angular like transclusion is easy! use a special `children` prop (doc)[https://reactjs.org/docs/composition-vs-inheritance.html#containment]
+ hooks(doc)[https://reactjs.org/docs/hooks-overview.html]

## Preact


