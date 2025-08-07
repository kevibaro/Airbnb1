import React from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Formulario() {
 const handleSubmit = (e) =>{
        e.preventDefault()
        const form = e.target

        const airbnb = {
        titulo: form.titulo.value,
        location: form.location.value,
        price: Number(form.price.value),
        imagen: form.imagen.value,
        bedrooms: form.bedrooms.value,
        tipo: form.tipo.value,
    }
    supabase
    .from('airbnb')
    .insert([airbnb])
    .then(({data, error}) =>{
        if (error){
            console.log('Error al insertar producto', error)
            alert('No se pudo guardar el producto')
        }else{
            console.log('Producto guardado', data)
            alert('¡Producto Agregado!')
            form.reset()
        }
    })
    .catch((err) =>{
        console.log('Error inesperado', err)
        alert('Ocurrió un error inesperado')
    })
    }
    return (

        <div>
             <div className='h-9'>
                    <Link to="/"><img className='w-18' src={logo} alt="" /></Link>
                    </div>
            <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                <input type="text" name='titulo' placeholder='titulo' className="p-3 border rounded border-gray-300  focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800"/>
                <input type="text" name='location' placeholder='location'className="p-3 border rounded border-gray-300  focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800" />
                <input type="text" name='price' placeholder='Precio'className="p-3 border rounded border-gray-300  focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800" />
                <input type="text" name='imagen' placeholder='Imagen' className="p-3 border rounded border-gray-300  focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800"/>
                <input type="text" name='bedrooms' placeholder='Bedrooms' className="p-3 border rounded border-gray-300  focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800"/>
                <input type="text" name='tipo' placeholder='tipo' className="p-3 border rounded border-gray-300  focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800"/>
                <button className='mt-4 ' type='submit'>Guardar</button>
               

            </form>
                <Link to="/"><button className='mt-4 px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition' type='button'>Pagina principal</button></Link>

        </div>
    )
}

export default Formulario