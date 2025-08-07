import { Auth } from '@supabase/auth-ui-react'
import './App.css'
import Formulario from './pages/Formulario'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cabañas from './components/types.jsx/Cabañas'
import Casas from './components/types.jsx/Casas'
import Playa from './components/types.jsx/Playa'
import Description from './components/types.jsx/Description'
import Reserva from './components/types.jsx/Reserva'




function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/:id" element={<Description />} />
        <Route path='/Formulario' element={<Formulario />} />
        <Route path='/Cabañas' element={<Cabañas />} />
        <Route path='/Casas' element={<Casas />} />
        <Route path='/Playa' element={<Playa />} />
        <Route path='/Reserva' element={<Reserva />} />
      </Routes>
    </>
  )
}

export default App
