import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './component/Home'
import Details from './component/Details'
import Create from './component/Create';
import Edit from './component/Edit';

function App() {
  const {search, pathname} = useLocation();
  return (
    <div className='h-screen w-screen flex'>

      {(pathname !="/" || search.length > 0 ) && ( <Link to ="/"className='text-red-300 absolute left-[17%] top-[3%]'>Home</Link> )}

     
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
     </Routes>
      
    </div>
  )
}

export default App



