import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DasboardHome from "./pages/dashboard/DasboardHome";
import { useUserActions } from "./store";
import { useEffect } from "react";

function App() {
  const { checkAuth } = useUserActions();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="dashboard">
        <Route index element={<DasboardHome />} />
      </Route>
    </Routes>
  );
}

export default App;
