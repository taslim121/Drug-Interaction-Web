import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/SideBar';

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
    <Navbar/>
    <main className='pt-16 md:pt-0'>
       <Outlet/>
    </main>
    
    </div>
    
  );
};

export default App