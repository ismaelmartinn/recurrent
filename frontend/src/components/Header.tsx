import { Link } from "react-router";
import { useUser } from "../store";

export default function Header() {
  const user = useUser((state) => state.user);
  const { logout } = useUser((state) => state.actions);

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error cerrando sesión");
      }

      if (response.status == 200) {
        logout();
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  }
  console.log(user);

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
        {!user && (
          <div className="flex gap-4">
            <Link to="/auth/login" className="btn btn-outline">
              Iniciar Sesión
            </Link>
            <Link to="/auth/register" className="btn btn-primary">
              Registarse
            </Link>
          </div>
        )}
        {user && (
          <div>
            <Link to="/dashboard" className="btn btn-primary">
              Dashboard
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
