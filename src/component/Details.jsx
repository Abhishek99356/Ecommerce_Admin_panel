import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import axios from '../utils/axios';
import Loading from './Loading';

function Details() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);  // Define a state to hold the product data
  const { id } = useParams();
  

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setProduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if(!product){
      setProduct(products.filter(p=>p.id == id)[0]);
      
    }
    // getSingleProduct();
  }, [id]); // Include `id` as a dependency

  const productDeleteHandler = (id) => {
    const filterdproducts = products.filter(p => p.id !== id);
    setProducts (filterdproducts);
    localStorage.setItem("products", JSON.stringify(filterdproducts));
    navigate('/');
  };

  return product ? (
    <div className='w-[70%] flex items-center h-full justify-between m-auto py-[10%]'>
      <img
        className='object-contain h-[80%] w-[40%]'
        src={`${product.image}`} // Correctly use template literals
        alt={product.title} // Set alt text dynamically
      />
      <div className='content w-[50%]'>
        <h1 className='text-4xl'>{product.title}</h1> {/* Use product title */}
        <h3 className='text-zinc-400 my-5'>{product.category}</h3> {/* Use product category */}
        <h2 className='text-red-400 mb-3'>${product.price}</h2> {/* Use product price */}
        <p className='mb-[5%]'>{product.description}</p> {/* Use product description */}
        <Link to = {`/edit/${product.id}`} className='mr-5 py-2 px-5 border rounded border-blue-200 text-blue-300'>Edit</Link>
        <button onClick ={() => productDeleteHandler(product.id)} className='py-2 px-5 border rounded border-red-200 text-red-300'>Delete</button>
      </div>
    </div>
  ) : (
    <Loading /> // Ensure correct component import and spelling
  );
}

export default Details;

