// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter,Match,Miss } from 'react-router';

/* styles */
import './css/style.css'

/* import components */
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound'

const repo = `/${window.location.pathname.split('/')[1]}`;
const Main = () => {
	return (
		<BrowserRouter basename={repo}>
		<div>
			<Match exactly pattern="/" component={StorePicker} />
			<Match exactly pattern="/store/:storeId" component={App} />
			<Miss component={NotFound} />
		</div>
		</BrowserRouter>
	);
}

render(<Main />, document.querySelector('#main'))