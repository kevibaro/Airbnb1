// src/components/MisReservas.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error("No hay usuario autenticado");

        const { data, error } = await supabase
          .from("reserva")
          .select("*")
          .eq("usuario", user.email)
          .order("fechaEntrada", { ascending: true });

        if (error) throw error;
        setReservas(data);
      } catch (err) {
        console.error("Error al obtener reservas:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  if (loading) return <p className="p-4">⏳ Cargando tus reservas...</p>;

  if (reservas.length === 0) {
    return <p className="p-4">📭 No tienes reservas aún.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Mis Reservas</h2>
      <div className="space-y-4">
        {reservas.map((reserva) => (
          <div
            key={reserva.id}
            className="border rounded-lg p-4 bg-gray-50 shadow-md"
          >
            <p>📅 Entrada: {new Date(reserva.fechaEntrada).toLocaleDateString()}</p>
            <p>📅 Salida: {new Date(reserva.fechaSalida).toLocaleDateString()}</p>
            <p>🛏️ Noches: {reserva.noches}</p>
            <p>💵 Total: ${reserva.precio.toLocaleString("es-CO")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisReservas;
