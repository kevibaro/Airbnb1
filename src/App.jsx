import { Auth } from '@supabase/auth-ui-react'
import './App.css'
import Formulario from './pages/Formulario'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Description from './components/tipos/Description'
import Reserva from './components/tipos/Reserva'




function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/:id" element={<Description />} />
        <Route path='/Formulario' element={<Formulario />} />
        <Route path='/Reserva' element={<Reserva />} />
      </Routes>
    </>
  )
}

export default App
