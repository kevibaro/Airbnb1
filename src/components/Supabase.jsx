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

  // Filtramos por localidad (location)
  const resultadosFiltrados = airbnb.filter((p) =>
    p.location?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* 🔍 Buscador */}
      <div className="mt-44 md:relative bottom-36 left-56 flex items-center justify-between w-full max-w-md md:max-w-xl rounded-full shadow-md border px-4 py-2 bg-white hover:shadow-lg transition-all cursor-pointer mx-auto mb-6">
        <div className="flex items-center  md:hidden w-30">
          <span className="text-sm font-semibold w-full">¿A dónde vas?</span>
        </div>

        <div className="flex px-3 border-r w-full">
          <input
            type="text"
            placeholder=""
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="outline-none w-full"
          />
          <div className="relative right-9 flex">
            <div className="bg-rose-500 p-2 rounded-full text-white ml-2 hover:bg-rose-600">
              <Search size={16} />
            </div>
            <MenuDesplegable />
            <UserDesplegable />
          </div>
        </div>
      </div>

      {/* 📋 Lista filtrada */}
      <div className="flex justify-center flex-wrap gap-6 p-6">
        {resultadosFiltrados.length > 0 ? (
          resultadosFiltrados.map((p) => (
            <div
              onClick={() => handleVerDetalles(p.id)}
              key={p.id}
              className="w-72 border rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <div className="card-body text-left">
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
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    {p.tipo}
                  </p>
                  <button
                    className="mt-3 w-full py-2 text-sm font-semibold bg-rose-500 cursor-pointer text-white rounded-xl hover:bg-rose-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVerDetalles(p.id);
                    }}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>

          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No se encontraron resultados
          </p>
        )}
      </div>
    </>
  );
}

export default Supabase;
