import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';


const AdminDashboard = () => {

    const {
        user: { name, email }
    } = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    Admin Navigation
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link text-success" to="/admin/create/category">Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-success" to="/admin/categories">Manage Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-success" to="/admin/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-success" to="/admin/products">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-success" to="/admin/orders">Manage Order</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge bg-success me-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-success me-2">Email:</span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-danger me-2">Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base title="Welcome Admin!" description="Manage All Products Here" className="container bg-success p-4">
            <div className="row">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
            </div>
        </Base>
    );
}

export default AdminDashboard;
