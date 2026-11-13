import { Link } from "react-router";
import { useUserActions, useUser, useUserLoading } from "../store";
import { useNavigate } from "react-router";

export default function Header() {
  const { logout } = useUserActions();
  let navigate = useNavigate();
  const loading = useUserLoading();
  const user = useUser();

  if (loading) return <span>Cargando...</span>;
  // if (!user) return navigate("/auth/login"); añadir a la ruta dashboard
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
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="flex justify-around items-center  py-2 border-b border-b-[#737373f2] bg-zinc-200">
      <nav className="flex gap-10">
        <div className="header__brand">
          <span>Recurrent</span>
        </div>
        <ul className="flex flex-row gap-8">
          <li>
            <Link to="/">Inicio</Link>
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
