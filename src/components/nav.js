import { html } from 'htm/preact';
import { BaseLink, Route } from 'react-router5';

const Nav = ({ router }) => html`<nav>
	<${BaseLink} router=${router} routeName="hooks">Hooks</${BaseLink}>
	<${BaseLink} router=${router} routeName="refract">Refract</${BaseLink}>
</nav>`;

export default () => html`
	<${Route}>${({ router }) => html`<${Nav} router=${router}/>`}</${Route}>
`;
