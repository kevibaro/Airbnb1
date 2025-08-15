
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Header() {

  return (
    <>
      <div className=' flex justify-center  px-4'>
        <div className='flex flex-col md:flex-row items-center justify-between border-b-2 border-b-gray-400 w-full h-auto md:h-20 gap-4 md:gap-0'>
          <Link to='/'><div>
            <img className='relative left-9 w-44 md:w-44' src={logo} alt="" />
          </div></Link>
        </div>
      </div>

    </>
  )
}

export default Header