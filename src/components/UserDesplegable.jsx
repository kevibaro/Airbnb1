import { useState } from 'react'
import { User } from 'lucide-react';
import { Link } from 'react-router-dom'
import Autenticacion from './Autenticacion';



function UserDesplegable() {
  const [open, setOpen] = useState(false)

  return (
    <div className='relative'>
      <div className="flex items-center  px-3 py-1 gap-2 hover:shadow-md transition cursor-pointer"
        onClick={() => setOpen(!open)}>
        <User size={18} />
      </div>
      {open && (
        <div className="absolute right-0 mt-2 w-3xs bg-white shadow-lg rounded-md overflow-hidden z-10">
          <Link to="/"><button className=" w-full px-4 py-2  hover:bg-gray-100 transition cursor-pointer">
            <Autenticacion />
          </button></Link>
        </div>
      )}
    </div>
  )
}

export default UserDesplegable