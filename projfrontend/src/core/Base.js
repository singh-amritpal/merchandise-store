import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Base = ({ title = "My Title", description = "My Description", className = "bg-dark text-white p-4", children }) => {
    return (
        <div>
            <Navigation />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-2">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h5>If you got any questions, feel free to reach out!</h5>
                    <Link to={`/contactus`} className="btn btn-dark card-link rounded">
                        Contact Us
                    </Link>
                </div>
                <div className="container text-center">
                    <span className="text-muted" >
                        An Amazing <span className="text-white">Merchandise</span> Store.
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base;