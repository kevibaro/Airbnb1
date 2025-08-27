// src/components/Reserva.jsx
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Reserva({ fechaEntrada, fechaSalida, noches, total }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const guardarReserva = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("No hay usuario autenticado");

      const { error } = await supabase
        .from('reserva')
        .insert([
          {
            fechaEntrada: fechaEntrada.toISOString(),
            fechaSalida: fechaSalida.toISOString(),
            noches,
            precio: total,
            usuario: user.email,
          }
        ]);

      if (error) throw error;

      // Mostrar modal de confirmación
      setShowModal(true);

    } catch (err) {
      console.error("Error al guardar reserva:", err.message);
      alert("❌ Error al guardar la reserva, por favor inicie sesión con Google ❌");
    }
  };

  const cerrarModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const irAMisReservas = () => {
    setShowModal(false);
    navigate('/mis-reservas');
  };

  return (
    <>
      <div className="mt-6 p-4 border rounded-xl bg-gray-50">
        <h2 className="text-xl font-bold mb-2">Resumen de tu Reserva</h2>
        <p>📅 Entrada: {fechaEntrada.toLocaleDateString()}</p>
        <p>📅 Salida: {fechaSalida.toLocaleDateString()}</p>
        <p>🛏️ Noches: {noches}</p>
        <p>💵 Total: ${total.toLocaleString('es-CO')}</p>
        <button
          onClick={guardarReserva}
          className="mt-4 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600"
        >
          Confirmar Reserva
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-4">✅ Reserva Confirmada</h3>
            <p className="mb-2">📅 Entrada: {fechaEntrada.toLocaleDateString()}</p>
            <p className="mb-2">📅 Salida: {fechaSalida.toLocaleDateString()}</p>
            <p className="mb-2">🛏️ Noches: {noches}</p>
            <p className="mb-4">💵 Total: ${total.toLocaleString('es-CO')}</p>

            {/* Botón volver al inicio */}
            <button
              onClick={cerrarModal}
              className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 mr-2"
            >
              Cerrar y Volver al Inicio
            </button>

            {/* Botón ir a Mis Reservas */}
            <button
              onClick={irAMisReservas}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Ver Mis Reservas
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Reserva;
