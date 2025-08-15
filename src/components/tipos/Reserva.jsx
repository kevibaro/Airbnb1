// src/components/Reserva.jsx
import React from 'react';
import { supabase } from '../../supabaseClient'; // Asegúrate que la ruta sea correcta
import { useNavigate } from 'react-router-dom';

function Reserva({ fechaEntrada, fechaSalida, noches, total }) {
  const navigate = useNavigate(); 

  const guardarReserva = async () => {
    try {
      // Obtener usuario actual
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("No hay usuario autenticado");

      // Insertar reserva en Supabase
      const { error } = await supabase
        .from('reserva')
        .insert([
          {
            fechaEntrada: fechaEntrada.toISOString(), // formato ISO
            fechaSalida: fechaSalida.toISOString(),
            noches: noches,
            precio: total,
            usuario: user.email, // email del usuario autenticado
          }
        ]);

      if (error) throw error;
      alert("✅ Reserva guardada exitosamente");
      navigate('/')

    } catch (err) {
      console.error("Error al guardar reserva:", err.message);
      alert("❌ Error al guardar la reserva, por favor inicie sesión con Google ❌");
      
    }
  };

  return (
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
  );
}

export default Reserva;
