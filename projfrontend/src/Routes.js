import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './core/Home';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
            </Switch>
        </Router>
    )
}

export default Routes;