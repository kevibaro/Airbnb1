import { useState } from 'react'
import { User } from 'lucide-react';
import Autenticacion from './Autenticacion';

function UserDesplegable() {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      {/* Botón para abrir/cerrar el menú */}
      <div
        className="flex items-center px-3 py-1 gap-2 hover:shadow-md transition cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <User size={18} />
      </div>

      {/* Menú desplegable */}
      {open && (
        <div className="absolute right-0 mt-2 w-3xs bg-white shadow-lg rounded-md overflow-hidden z-10">
          <Autenticacion />
        </div>
      )}
    </div>
  );
}

export default UserDesplegable;
