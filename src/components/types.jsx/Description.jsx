import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Header from "../header";
import CalendarioReserva from "./CalendarioReserva";
import Reserva from "./Reserva";



function Description() {
  const { id } = useParams();  // ID que viene de la URL
  const navigate = useNavigate();
  const [propiedad, setPropiedad] = useState(null);
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    supabase
      .from("airbnb")
      .select("*")
      .eq("id", id)
      .single()  // Devuelve solo un registro
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          setPropiedad(data);
        }
      });
  }, [id]);

  if (!propiedad) {
    return <p className="text-center mt-10">Cargando...</p>;
  }
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-xl shadow-lg">
        <img
          src={propiedad.imagen}
          alt={propiedad.titulo}
          className="w-full h-64 object-cover rounded-xl" />
        <h1 className="text-2xl font-bold mt-4">{propiedad.titulo}</h1>
        <p className="text-gray-600 mt-2">{propiedad.location}</p>
        <p className="text-lg mt-2">{propiedad.descripcion}</p>
        <p className="font-semibold text-rose-500 mt-4">${propiedad.price} / noche</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dicta ea dolor deserunt eius tempore amet ullam tenetur voluptatem magnam eos deleniti soluta placeat, facilis quia et architecto exercitationem modi.</p>
        <CalendarioReserva 
        precioNoche={propiedad.price} 
        onReservar={(datosReserva) => setReserva(datosReserva)}/>
        
         {reserva && (
          <Reserva
            fechaEntrada={reserva.fechaEntrada}
            fechaSalida={reserva.fechaSalida}
            noches={reserva.noches}
            total={reserva.total}
            
          />
        )}

      </div>
    </>
  );
}

export default Description;
