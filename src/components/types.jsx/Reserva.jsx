import React from 'react'

function Reserva({fechaEntrada,  fechaSalida, noches, total}) {
  return (
    <div className="mt-6 p-4 border rounded-xl bg-gray-50">
      <h2 className="text-xl font-bold mb-2">Resumen de tu Reserva</h2>
      <p>📅 Entrada: {fechaEntrada.toLocaleDateString()}</p>
      <p>📅 Salida: {fechaSalida.toLocaleDateString()}</p>
      <p>🛏️ Noches: {noches}</p>
      <p>💵 Total: ${total.toLocaleString('es-CO')}</p>
    </div>
  );
}

export default Reserva