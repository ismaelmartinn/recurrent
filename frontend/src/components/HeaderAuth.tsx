import { Link } from "react-router";
export default function HeaderAuth() {
  return (
    <header className="flex justify-between items-center px-20 py-2 border-b border-b-[#737373f2] bg-zinc-200">
      <div className="header__brand">
        <span>Recurrent</span>
      </div>
      <nav>
        <ul className="flex flex-row gap-8">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/about">Sobre nosotros</Link>
          </li>
          <li>
            <Link to="/dashboard">Características</Link>
          </li>
          <li>
            <Link to="/dashboard">Cómo funciona</Link>
          </li>
          <li>
            <Link to="/dashboard">Precios</Link>
          </li>

        </ul>
      </nav>
      <div className="header__acount flex gap-4">
        <Link to="/auth/login" className="btn btn-outline">
          Iniciar Sesión
        </Link>
        <Link to="/auth/register" className="btn btn-primary">
          Registarse
        </Link>
      </div>
    </header>
  );
}
