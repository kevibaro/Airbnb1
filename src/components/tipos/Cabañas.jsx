import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import Scrol from '../Scrol';
import Header from '../Header';
import Autenticacion from '../Autenticacion';

function Cabañas() {
  const [cabañas, setCabañas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from('airbnb')
      .select('*')
      .ilike('tipo', '%cabañas%')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al cargar productos:', error);
          alert('No se pudieron cargar los productos');
        } else {
          setCabañas(data);
        }
      })
      .catch(err => {
        console.error('Error inesperado:', err);
        alert('Ocurrió un error al cargar');
      });
  }, []);

  const handleVerDetalles = (id) => {
    navigate(`/${id}`);
  };

  return (
    <>
      <Autenticacion/>
      <Header />
      <Scrol />
      <div className="flex justify-center flex-wrap gap-6 p-6">
        {cabañas.map((p) => (
          <div
            key={p.id}
            onClick={() => handleVerDetalles(p.id)}
            className="w-72 border rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <div className="card-body text-left">
              <img
                src={p.imagen}
                alt={p.titulo}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{p.titulo}</h3>
                <p className="text-sm text-gray-500">{p.location}</p>
                <p className="text-base font-medium text-gray-900 mt-1">${p.price} / noche</p>
                <p className="text-sm text-gray-500">🛏️ {p.bedrooms}</p>
                <p className="flex items-center gap-2 text-sm text-gray-500">{p.tipo}</p>
                <button
                  className="mt-3 w-full py-2 text-sm font-semibold bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
                  onClick={(e) => {
                    e.stopPropagation(); // evita que el click se propague al div
                    handleVerDetalles(p.id);
                  }}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cabañas;
