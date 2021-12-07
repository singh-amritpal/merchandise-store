import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, authToken } = isAuthenticated();

    const goBack = () => (
        <div className="mt-3">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = event => {
        setError("");
        setName(event.target.value)
    }

    const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired
        createCategory(user._id, authToken, { name })
            .then(data => {
                if (data && data.error) {
                    setError(true)
                } else {
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            })
            .catch("UNABLE TO CREATE CATEGORY")
    }

    const successMessage = () => {
        if (success) {
            return (
                <div className="row" >
                    <div className="col-md-6 offset-sm-3 text-center mt-3">
                        <div className="alert alert-success" role="alert" style={{ display: success ? "" : "none" }}>
                            New category created successfully
                        </div>
                    </div>
                </div>
            );
        }
    }

    const errorMessage = () => {
        if (error) {
            return (
                <div className="row" >
                    <div className="col-md-6 offset-sm-3 text-center mt-3">
                        <div className="alert alert-danger" role="alert" style={{ display: success ? "" : "none" }}>
                            Failed to create category
                        </div>
                    </div>
                </div>
            );
        }
    }

    const categoryForm = () => (
        <form action="">
            <div className="form-group">
                <label htmlFor="categoryName" className="mt-3">Enter the Category</label>
                <input type="text" className="form-control my-3" name="categoryName" onChange={handleChange} value={name} autoFocus required placeholder="ex. Summer" />
                <button className="btn btn-outline-success mb-3" onClick={onSubmit}>Create Category</button>
            </div>
        </form>
    )

    return (
        <Base title="Create a New Category" description="Add a new category for products" className="container bg-white p-4">
            {goBack()}
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {categoryForm()}
                </div>
            </div>
        </Base>
    );
}

export default AddCategory;
