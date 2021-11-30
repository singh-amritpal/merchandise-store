import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import Home from './core/Home';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import AddCategory from './admin/AddCategory';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/admin/create/category" component={AddCategory} />
            </Switch>
        </Router>
    )
}

export default Routes;