// src/components/CalendarioReserva.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from 'react-router-dom';

function CalendarioReserva({ precioNoche, onReservar }) {
  const [fechaEntrada, setFechaEntrada] = useState(null);
  const [fechaSalida, setFechaSalida] = useState(null);

  const noches = fechaEntrada && fechaSalida
    ? differenceInCalendarDays(fechaSalida, fechaEntrada)
    : 0;

  const total = noches * precioNoche;


  const handleReservar = () => {
    if (fechaEntrada && fechaSalida && noches > 0) {
      onReservar({
        fechaEntrada,
        fechaSalida,
        noches,
        total
      });
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-bold mb-2">Reserva tu estadía</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div>
          <label className="block font-medium">Entrada</label>
          <DatePicker
            selected={fechaEntrada}
            onChange={(date) => {
              setFechaEntrada(date);
              if (fechaSalida && date >= fechaSalida) setFechaSalida(null);
            }}
            selectsStart
            startDate={fechaEntrada}
            endDate={fechaSalida}
            minDate={new Date()}
            placeholderText="Selecciona fecha"
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Salida</label>
          <DatePicker
            selected={fechaSalida}
            onChange={(date) => setFechaSalida(date)}
            selectsEnd
            startDate={fechaEntrada}
            endDate={fechaSalida}
            minDate={fechaEntrada || new Date()}
            placeholderText="Selecciona fecha"
            className="border p-2 rounded w-full"
            disabled={!fechaEntrada}
          />
        </div>
        {noches > 0 && (
          <div className="text-sm text-gray-700 mt-2 border">
            <div className='flex flex-col text-2xl'>
              <p>🛏️ {noches} noche(s)</p>
              <p>💵 Total: <strong>${total.toLocaleString('es-CO')}</strong></p>
              <button
                className="mt-2 w-full py-2 text-sm font-semibold bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
                onClick={handleReservar}
                disabled={!fechaEntrada || !fechaSalida}
              >
                Reservar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

export default CalendarioReserva;
