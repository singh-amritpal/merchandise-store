import React, { useState, useEffect } from "react";
import "../style.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getAllProducts().then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setProducts(data.products)
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, []);

    return (
        <Base title="Home Page" description="Welcome to the Merchandise Store" className="container bg-white p-4">
            <div className="row text-center">
                <h1 className="text-dark">All Products</h1>
                <div className="row card-div">
                    {
                        products.map((product, index) => {
                            return (
                                <div key={index} className="col-12  col-lg-4 text-center mb-4">
                                    <Card product={product} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Base>
    )
}

export default Home;