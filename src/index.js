import './index.css';
import { h, Component, render } from 'preact';
import { html } from 'htm/preact';

const app = html`<div>Hello World!</div>`;
render(app, document.body);
