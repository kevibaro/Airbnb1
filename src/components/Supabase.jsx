import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import MenuDesplegable from "./MenuDesplegable";
import UserDesplegable from "./UserDesplegable";

function Supabase() {
  const [airbnb, setAirbnb] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from("airbnb")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error al cargar productos:", error);
          alert("No se pudieron cargar los productos");
        } else {
          setAirbnb(data);
        }
      })
      .catch((err) => {
        console.error("Error inesperado:", err);
        alert("Ocurrió un error al cargar");
      });
  }, []);

  const handleVerDetalles = (id) => {
    navigate(`/${id}`);
  };

  const resultadosFiltrados = airbnb.filter((p) =>
    p.location?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* 🔍 Buscador */}
      <div className="flex items-center justify-between w-full max-w-lg md:max-w-2xl rounded-full shadow-md border px-3 py-2 bg-white hover:shadow-lg transition-all mx-auto mt-4">
        {/* Input de búsqueda */}
        <div className="flex items-center w-full gap-2">
          <input
            type="text"
            placeholder="¿A dónde vas?"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-2 py-1 text-sm md:text-base outline-none"
          />
          <button className="bg-rose-500 p-2 rounded-full text-white hover:bg-rose-600 transition">
            <Search size={16} />
          </button>
        </div>

        {/* Menú y usuario (ocultos en móvil) */}
        <div className="hidden md:flex items-center gap-2 ml-4">
          <MenuDesplegable />
          <UserDesplegable />
        </div>
      </div>

      {/* 📋 Lista filtrada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {resultadosFiltrados.length > 0 ? (
          resultadosFiltrados.map((p) => (
            <div
              onClick={() => handleVerDetalles(p.id)}
              key={p.id}
              className="w-full border rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <img
                src={p.imagen}
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {p.titulo}
                </h3>
                <p className="text-sm text-gray-500">{p.location}</p>
                <p className="text-base font-medium text-gray-900 mt-1">
                  ${p.price} / noche
                </p>
                <p className="text-sm text-gray-500">🛏️ {p.bedrooms} </p>
                <p className="text-sm text-gray-500">{p.tipo}</p>
                <p className="text-sm text-gray-500">{p.fecha_actual}</p>
                <button
                  className="mt-3 w-full py-2 text-sm font-semibold bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVerDetalles(p.id);
                  }}
                >
                  Reservar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full col-span-full">
            No se encontraron resultados
          </p>
        )}
      </div>
    </>
  );
}

export default Supabase;
