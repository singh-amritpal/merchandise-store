import React from 'react';
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" }
    }
    else {
        return { color: "#FFFFFF" }
    }
}

const Navigation = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link" to="/" style={currentTab(history, "/")}>Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/cart" style={currentTab(history, "/cart")}>Cart</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/user/dashboard" style={currentTab(history, "/user/dashboard")}>Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard" style={currentTab(history, "/admin/dashboard")}>A. Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup" style={currentTab(history, "/signup")}>Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signin" style={currentTab(history, "/signin")}>Sign In</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signout" style={currentTab(history, "/signut")}>Sign Out</Link>
            </li>
        </ul>
    </div>
)

export default withRouter(Navigation);