import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getCategories, getProduct, updateProduct } from './helper/adminapicall';


const UpdateProduct = ({ match }) => {

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
        updatedProduct: "",
        getARedirect: false,
        formData: ""
    })

    const { name, description, price, availableUnits, categories, category, loading, error, updatedProduct, getARedirect, formData } = values;

    const goBack = () => (
        <div className="mt-3">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const preload = (productId) => {
        getProduct(productId).then(data => {
            //console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    availableUnits: data.availableUnits,
                    formData: new FormData()
                });
                preloadCategories();
            }
        })
    }

    const preloadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            else {
                setValues({
                    categories: data,
                    formData: new FormData()
                });
            }
        })
    }

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        //backend request fired
        updateProduct(match.params.productId, user._id, authToken, formData)
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
                        loading: false,
                        updatedProduct: name
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
                    <div className="alert alert-success" role="alert" style={{ display: updatedProduct ? "" : "none" }}>
                        Product "{updatedProduct}" updated successfully
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
            <span>Product Photo</span>

            <div className="form-group mb-3">
                <label className="btn btn-block text-white">
                    <input onChange={handleChange("photo")} type="file" name="photo" accept="image" placeholder="choose a file" />
                </label>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="productName">Product Name</label>
                <input onChange={handleChange("name")} name="productName" className="form-control" placeholder="Name" value={name} />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="description">Product Description</label>
                <textarea onChange={handleChange("description")} name="description" className="form-control" placeholder="Description" value={description} />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="price">Price</label>
                <input onChange={handleChange("price")} type="number" name="price" className="form-control" placeholder="Price" value={price} />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="categories">Product Category</label>
                <select onChange={handleChange("category")} name="categories" className="form-control" placeholder="Category">
                    <option>Select</option>
                    {categories && categories.map((category, index) => {
                        return (<option key={index} value={category._id}>{category.name}</option>)
                    })}
                </select>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="availableUnits">Available Units</label>
                <input onChange={handleChange("availableUnits")} name="availableUnits" type="number" className="form-control" placeholder="Quantity" value={availableUnits} />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
                Update Product
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
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateProduct;