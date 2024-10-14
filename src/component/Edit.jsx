import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';

function Edit() {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [product, setProduct] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    price: '',   
  });

  // Handle input change
  const changeHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const foundProduct = products.find((p) => p.id == id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const editProductHandler = (e) => {
    e.preventDefault();
    const { title, image, category, price, description } = product;

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 3 ||
      parseFloat(price) <= 0 ||  // Ensure price is a positive number
      description.trim().length < 5
    ) {
      alert("Please ensure all fields are filled out correctly.");
      return;
    }

    const pi =  products.findIndex((p) => p.id == id);
    const copyData = [...products];
    copyData[pi] = {...product[pi], ...product};

    // const updatedProducts = products.map(p => 
    //   p.id === product.id ? product : p
    // );
    
    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate("/");
  };

  return (
    <form onSubmit={editProductHandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
      <h1 className='mb-5 w-1/2 text-3xl'>Edit Product</h1>

      <input
        type='url'
        placeholder='Image Link'
        className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        name='image'
        onChange={changeHandler}
        value={product.image}
      />

      <input
        type='text'
        placeholder='Title'
        className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        name='title'
        onChange={changeHandler}
        value={product.title}
      />

      <div className='w-1/2 flex justify-between'>
        <input
          type='text'
          placeholder='Category'
          className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
          name='category'
          onChange={changeHandler}
          value={product.category}
        />

        <input
          type='number'
          placeholder='Price'
          className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3'
          name='price'
          onChange={changeHandler}
          value={product.price}
        />
      </div>

      <textarea
        name='description'
        onChange={changeHandler}
        placeholder='Enter product description here...'
        value={product.description}
        className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
        rows="10"
      />

      <div className='w-1/2'>
        <button className='py-2 px-5 border rounded border-blue-200 text-blue-300'>
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default Edit;

