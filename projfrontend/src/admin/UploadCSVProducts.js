import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { uploadCSVProducts } from './helper/adminapicall';


const UploadCSVProducts = () => {
    const { user, authToken } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        availableUnits: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getARedirect: false,
        formData: ""
    })

    const { name, description, price, availableUnits, categories, category, loading, error, createdProduct, getARedirect, formData } = values;

    const goBack = () => (
        <div className="mt-3">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        //backend request fired
        uploadCSVProducts(user._id, authToken, formData)
            .then(data => {
                if (data?.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        photo: "",
                        availableUnits: "",
                        loading: false
                    });
                }
            })
            .catch("UNABLE TO CREATE PRODUCT")
    }

    const handleChange = name => event => {
        const value = name === "csv" ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value });
    }

    const successMessage = () => {
        return (
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-center mt-3">
                    <div className="alert alert-success" role="alert" style={{ display: createdProduct ? "" : "none" }}>
                        File uploaded successfully
                    </div>
                </div>
            </div>
        );
    }

    const errorMessage = () => {
        return (
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-center mt-3">
                    <div className="alert alert-danger" role="alert" style={{ display: error ? "" : "none" }}>
                        Failed to Upload File
                    </div>
                </div>
            </div>
        );
    }

    const uploadCSVForm = () => (
        <form >
            <div className="form-group mb-3 bg-white rounded">
                <label className="btn btn-block">
                    <input onChange={handleChange("csv")} type="file" name="photo" accept=".csv" placeholder="choose a file" />
                </label>
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Upload File
            </button>
        </form>
    );

    return (
        <Base title="Add a New Product" description="Add a new product here" className="container bg-white p-4">
            {goBack()}
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {uploadCSVForm()}
                </div>
            </div>
        </Base>
    );
}

export default UploadCSVProducts;