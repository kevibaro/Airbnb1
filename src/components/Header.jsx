
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <>
      <div className=' flex justify-center  px-4'>
        <div className='flex justify-center md:flex-row items-center  border-b-gray-400 w-full h-auto md:h-20 gap-4 md:gap-0'>
          <Link to='/'><div>
            <img className='relative flex  w-50 md:w-50' src={logo} alt="" />
          </div></Link>
        </div>
      </div>

    </>
  )
}

export default Header