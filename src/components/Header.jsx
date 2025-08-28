import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="w-full border-b border-gray-200 shadow-sm bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              className="w-28 md:w-36 object-contain"
              src={logo}
              alt="Logo"
            />
          </Link>

          {/* Menú de navegación de ejemplo (se puede ampliar) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-rose-500">
              Inicio
            </Link>
            <Link to="/explorar" className="text-gray-700 hover:text-rose-500">
              Explorar
            </Link>
            <Link to="/perfil" className="text-gray-700 hover:text-rose-500">
              Perfil
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
