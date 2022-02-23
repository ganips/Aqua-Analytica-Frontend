import React from 'react';
import { Route } from 'react-router';
import Admin from './Admin';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Router, Switch } from 'react-router-dom';
import Login from './Login';
import Traders from './Trader';
import history from './history';
import Users from './User';

class App extends React.Component{

    render(){
        return(
            <div>
                <BrowserRouter history={history}>
                    <Switch>
                    <Route exact path="/" component={() => localStorage.getItem('type') === 'admin' ? <Redirect to='/admin' /> : localStorage.getItem('type') === 'Trader' ? <Redirect to='/trader' /> : localStorage.getItem('type') === 'Customer' ? <Redirect to='/customer' /> : <Redirect to='/login' /> }/>
                    <Route path="/login" component={() => localStorage.getItem('type') === 'admin' ? <Redirect to='/admin' /> : localStorage.getItem('type') === 'Trader' ? <Redirect to='/trader' /> : localStorage.getItem('type') === 'Customer' ? <Redirect to='/customer' /> : <Login />} />
                    <Route path="/admin" component={() => localStorage.getItem('type') === "admin" ? <Admin /> : <Redirect to='/login' />} />
                    <Route path="/trader" component={() => localStorage.getItem('type') === 'Trader' ? <Traders /> : <Redirect to='/login' />} />
                    <Route path="/customer" component={() => localStorage.getItem('type') === 'Customer' ? <Users /> : <Redirect to='/login' />} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users : localStorage
    }
}

export default connect(mapStateToProps)(App);