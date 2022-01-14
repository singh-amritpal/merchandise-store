import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteCategory, getCategories } from './helper/adminapicall';

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);

    const { user, authToken } = isAuthenticated();

    const goBack = () => (
        <div className="mt-3">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const preload = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteACategory = categoryId => {
        deleteCategory(categoryId, user._id, authToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        })
    }

    return (
        <div>
            <Base title="Welcome Admin" description="Manage Categories" className="container bg-white p-4">
                {goBack()}
                <div id="card-div" className="row card-div">
                    {
                        categories?.map((category, index) => {
                            return (
                                <div key={index} className="col-12 col-lg-4 text-center mb-2">
                                    <div className="card shadow-sm p-3 mb-3 bg-white rounded" style={{ width: "100%" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{category.name}</h5>
                                        </div>
                                        <div className="card-body">
                                            {/* <Link to={`/admin/category/update/${category._id}`} className="btn btn-outline-primary card-link">
                                                Update
                                            </Link> */}

                                            <Link to="/admin/categories" onClick={() => {
                                                deleteACategory(category._id)
                                            }} className="btn btn-outline-danger card-link">
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Base>
        </div>
    );
}

export default ManageCategories;