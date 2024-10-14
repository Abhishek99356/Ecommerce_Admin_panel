import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';

function Nav() {
  const [products] = useContext(ProductContext);

  let distinct_category = 
       products && products.reduce((acc, cv)=>[...acc, cv.category], []);
       distinct_category = [...new Set(distinct_category)];

  return (
    
       <nav className='w-[15%] h-full bg-zinc-50 flex-col item-center pt-5'>
        <a 
        className='py-2 px-5 border rounded border-blue-200 text-blue-300'
        href='/create'
        >
          Add New Product
        </a>
        <hr className='my-3 w-[80%]'/>
        <h1 className='text-2xl mb-3 w-[80%]'>Category Filter</h1>
        <div className='w-[80%]'>

          {distinct_category.map((c,i)=>( 
            
            <Link
            key={i} 
                to={`/?category=${c}`}
                className='flex item-center mb-3'>
                <span className='rounded-full mr-2  w-[15px] h-[15px] bg-blue-100'></span>{''}
           {c}
          </Link>))}
         

        </div>
        
      </nav>
   
  )
}

export default Nav
