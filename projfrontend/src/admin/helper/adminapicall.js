import { API } from "../../backend";

//CATEGORY API CALLS
//Create A Category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

//Get A Single Category
export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: "GET"
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

//Get All Categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

//Update A Category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

//Delete A Category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        mode: 'cors',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

//PRODUCT API CALLS
//Create A Product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

export const uploadCSVProducts = (userId, token, product) => {
    return fetch(`${API}/product/upload/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

//Get All Products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

//Get A Single Product
export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}

//Update A Product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data)
    }).catch(err => console.log(err));
}

//Delete A Product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        mode: 'cors',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
}