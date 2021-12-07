import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const { user, authToken } = isAuthenticated();

    const goBack = () => (
        <div className="mt-3">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const preload = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data.products);
            }
        });
    }

    useEffect(() => {
        preload();
    }, []);

    const deleteAProduct = productId => {
        deleteProduct(productId, user._id, authToken).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        })
    }

    return (
        <div>
            <Base title="Welcome Admin" description="Manage Products" className="container bg-white p-4">
                {goBack()}
                <div id="card-div" className="row">
                    {
                        products?.map((product, index) => {
                            return (
                                <div key={index} className="col-12  col-lg-4 text-center mb-2 ">
                                    <div class="card shadow-sm p-3 mb-5 bg-white rounded" style={{ width: "100%" }}>
                                        <div class="card-body">
                                            <h5 class="card-title">{product.name}</h5>
                                            <p class="card-text">{product.description}</p>
                                        </div>
                                        <div class="card-body">
                                            <Link to={`/admin/product/update/${product._id}`} className="btn btn-outline-primary card-link">
                                                Update
                                            </Link>

                                            <Link to="/admin/products" onClick={() => {
                                                deleteAProduct(product._id)
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

export default ManageProducts;