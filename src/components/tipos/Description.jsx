import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import CalendarioReserva from "./CalendarioReserva";
import Reserva from "./Reserva";
import Autenticacion from "../Autenticacion";

function Description() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    supabase
      .from("airbnb")
      .select("*")
      .eq("id", id)
      .single()
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
      <Autenticacion />
      <div className="max-w-6xl mx-auto mt-8 p-4 md:p-8">
        {/* Grid responsivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 📸 Imagen */}
          <div>
            <img
              src={propiedad.imagen}
              alt={propiedad.titulo}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* 📋 Info + Reserva */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {propiedad.titulo}
              </h1>
              <p className="text-gray-600 mt-1">{propiedad.location}</p>
              <p className="text-base md:text-lg mt-3">{propiedad.descripcion}</p>
              <p className="font-semibold text-rose-500 mt-4 text-lg md:text-xl">
                ${propiedad.price} / noche
              </p>
              <p className="mt-3 text-sm md:text-base text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
                dicta ea dolor deserunt eius tempore amet ullam tenetur voluptatem
                magnam eos deleniti soluta placeat.
              </p>
            </div>

            {/* 📆 Calendario y Reserva */}
            <div className="mt-6 border rounded-xl shadow-md p-4">
              <CalendarioReserva
                precioNoche={propiedad.price}
                onReservar={(datosReserva) => setReserva(datosReserva)}
              />

              {reserva && (
                <Reserva
                  fechaEntrada={reserva.fechaEntrada}
                  fechaSalida={reserva.fechaSalida}
                  noches={reserva.noches}
                  total={reserva.total}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Description;
