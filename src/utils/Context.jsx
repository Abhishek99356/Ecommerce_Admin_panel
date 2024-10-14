import axios from './axios';
import React, { createContext, useEffect, useState } from 'react';
// Removed unused import
// import { useActionData } from 'react-router-dom';

export const ProductContext = createContext();

function Context(props) {
    // Use camelCase for state variable names
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || []);

    // Optional: Uncomment if you want to fetch products from an API
    // const getProducts = async () => {
    //     try {
    //         const { data } = await axios("/products");
    //         setProducts(data);
    //         localStorage.setItem("products", JSON.stringify(data)); // Save fetched data to localStorage
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // Optional: Uncomment if you want to trigger fetching on component mount
    // useEffect(() => {
    //     getProducts();
    // }, []);

    return (
        <ProductContext.Provider value={[products, setProducts]}>
            {props.children}
        </ProductContext.Provider>
    );
}

export default Context;

