
import logo from '../assets/logo.png'
import { Search } from 'lucide-react';
import { Globe, Menu, User, Home } from 'lucide-react';
import MenuDesplegable from '../components/MenuDesplegable'
import UserDesplegable from '../components/UserDesplegable'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <div className=' flex justify-center px-4'>
        <div className='flex flex-col md:flex-row items-center justify-between border-b-2 border-b-gray-400 w-full h-auto md:h-20 gap-4 md:gap-0'>

          <Link to='/'><div>
            <img className='w-24 md:w-28' src={logo} alt="" />
          </div></Link>


          <div className="flex items-center justify-between w-full max-w-md md:max-w-xl rounded-full shadow-md border px-4 py-2 bg-white hover:shadow-lg transition-all cursor-pointer">
           

            <div className="flex flex-col md:hidden w-full">
              <span className="text-sm font-semibold">¿A dónde vas?</span>
              <span className="text-xs text-gray-400">Agrega fechas • ¿Cuántos?</span>
            </div>


            
            <div className="hidden md:flex w-full items-center justify-between text-sm font-semibold text-black ">
              <div className="px-3 border-r">Cualquier lugar</div>
              <div className="px-3 border-r">Semana</div>
              <div className="px-3 text-gray-400">¿Cuántos?</div>
            </div>
            <div className="bg-rose-500 p-2 rounded-full text-white ml-2 hover:bg-rose-600">
              <Search size={16} />
            </div>
            <MenuDesplegable/>
            <UserDesplegable/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header