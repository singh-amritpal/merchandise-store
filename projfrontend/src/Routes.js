import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import Home from './core/Home';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import ContactUs from './user/ContactUs';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/contactus" component={ContactUs} />
                <Route exact path="/cart" component={Cart} />
                <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/admin/create/category" component={AddCategory} />
                <AdminRoute exact path="/admin/categories" component={ManageCategories} />
                <AdminRoute exact path="/admin/create/product" component={AddProduct} />
                <AdminRoute exact path="/admin/products" component={ManageProducts} />
                <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct} />
                <AdminRoute exact path="/admin/category/update/:categoryId" component={UpdateCategory} />
            </Switch>
        </Router>
    )
}

export default Routes;