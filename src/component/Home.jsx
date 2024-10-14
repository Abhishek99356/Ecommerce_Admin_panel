import React, { useContext, useEffect, useState } from 'react';
import Nav from './Nav';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loading';
import axios from '../utils/axios';

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = search.includes('=') ? decodeURIComponent(search.split('=')[1]) : null;

  const [filterproducts, setfilteredproducts] = useState([]);
  const [error, setError] = useState(null);

  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredproducts(data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch products. Please try again later.");
    }
  };

  useEffect(() => {
    if (category) {
      getproductscategory();

      setfilteredproducts(products.filter(p=>p.category === category));
    } else {
      setfilteredproducts(products);
    }

   
  }, [category, products]);

  return filterproducts && filterproducts.length > 0 ? (
    <>
      <Nav />

      <div className='w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto'>
        {filterproducts.map((p) => (
          <Link  
            to={`/details/${p.id}`}  
            className='mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex-col flex justify-center items-center'
            key={p.id}
          >
            <div
              className='hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center'
              style={{
                backgroundImage: `url(${p.image})`,
              }}
            ></div>
            <h1 className='hover:text-blue-300 '>{p.title}</h1>
          </Link>
        ))}
      </div>
    </>
  ) : error ? (
    <div className="error">{error}</div>
  ) : (
    <Loading />
  );
}

export default Home;


