import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

function MenuDesplegable() {
  const [open, setOpen] = useState(false)

  return (
    <div className='relative'>
      <div
        className="flex items-center  px-3 py-1 gap-2 hover:shadow-md transition cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Menu size={18} />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-10">
         
          <Link to="/Formulario"> <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition cursor-pointer">
            Publicar
          </button></Link>
          <Link to="/MisReservas"> <button className="block w-full px-4 py-2 text-left hover:bg-gray-100 transition cursor-pointer">
            Mis reservas
          </button></Link>
         
        </div>
      )}
    </div>
  )
}

export default MenuDesplegable
