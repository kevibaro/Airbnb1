import { Tent,Home, Waves, Trees, TreePalm, TentTree } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Scrol() {
  return (
    <>
    <div className=' flex justify-center items-center  gap-10 h-20  '>
       <Link to="/cabañas"> <div className='flex items-center flex-col '>
        <Tent/>
        Cabañas
        </div></Link>
        <Link to="/Casas"><div className='flex items-center flex-col'>
        <Home/>
        Casas
        </div></Link>
        <Link to="/playa"><div className='flex items-center flex-col'>
        <Waves/>
        Frente a la playa
        </div></Link>
       <Link to="/cabañas"> <div className='flex items-center flex-col '>
        <Tent/>
        Cabañas
        </div></Link>
        
       <Link to="/Casas"><div className='flex items-center flex-col'>
        <Home/>
        Casas
        </div></Link>
        
        <Link to="/playa"><div className='flex items-center flex-col'>
        <Waves/>
        Frente a la playa
        </div></Link>
       <Link to="/cabañas"> <div className='flex items-center flex-col '>
        <Tent/>
        Cabañas
        </div></Link>
        <Link to="/Casas"><div className='flex items-center flex-col'>
        <Home/>
        Casas
        </div></Link>
        <Link to="/cabañas"> <div className='flex items-center flex-col '>
        <Tent/>
        Cabañas
        </div></Link>
    </div>
    </>
  )
}

export default Scrol