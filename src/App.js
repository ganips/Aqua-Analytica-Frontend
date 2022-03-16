import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import HeaderBar from './components/HeaderBar';
import Dashboard from './components/Dashboard';

function App(){
	return(
		<div>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={() => <Redirect to="/home" />} />
					<Route path="/home" component={() => <Home />} />
					<Route path="/about" component={() => <><About /></>} />
					<Route path="/contact" component={() => <><Contact /></>} />
					<Route path="/dashboard" component={() => <Dashboard />} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App;