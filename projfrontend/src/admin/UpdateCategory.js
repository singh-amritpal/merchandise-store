import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategory, updateCategory } from './helper/adminapicall';


const UpdateCategory = ({ match }) => {

    const { user, authToken } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        loading: false,
        error: "",
        updatedCategory: "",
        getARedirect: false,
        formData: ""
    })

    const { name, description, price, availableUnits, categories, category, loading, error, updatedCategory, getARedirect, formData } = values;

    const goBack = () => (
        <div className="mt-3">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            //console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    formData: new FormData()
                });

            }
        })
    }

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        //backend request fired
        updateCategory(match.params.categoryId, user._id, authToken, formData)
            .then(data => {
                if (data?.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        loading: false,
                        updatedCategory: name
                    });
                }
            })
            .catch("UNABLE TO UPDATE PRODUCT")
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    const successMessage = () => {
        return (
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-center mt-3">
                    <div className="alert alert-success" role="alert" style={{ display: updatedCategory ? "" : "none" }}>
                        Product "{updatedCategory}" updated successfully
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
                        Failed to Update Product
                    </div>
                </div>
            </div>
        );
    }

    //TODO: Come back here for redirect action
    // useEffect(() => {
    //     if (loading) {
    //         setTimeout(() => {
    //             return <Redirect to="/admin/dashboard" />
    //         }, 2000)
    //     }
    // }, [getARedirect]);

    const createProductForm = () => (
        <form >
            <div className="form-group mb-3">
                <label for="Name">Category Name</label>
                <input onChange={handleChange("name")} name="Name" className="form-control" placeholder="Name" value={name} />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Update Category
            </button>
        </form>
    );

    return (
        <Base title="Add a New Product" description="Add a new product here" className="container bg-info p-4">
            {goBack()}
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateCategory;