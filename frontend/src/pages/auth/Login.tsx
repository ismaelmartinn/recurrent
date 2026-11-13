import { useUserActions } from "../../store";
import { useNavigate } from "react-router";
export default function Login() {
  let navigate = useNavigate();
  const { setUser } = useUserActions();
  async function handleLogin(event: any) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const data = { email: email, password: password };
    try {
      const response = await fetch("http://localhost:3000/auth/login/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status == 200) {
        setUser(result);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Email</label>
      <input type="password" name="password" id="password" />
      <button type="submit">Logear</button>
    </form>
  );
}
