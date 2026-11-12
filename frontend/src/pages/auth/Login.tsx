import { useUser } from "../../store";
export default function Login() {
  const { addUser } = useUser((state) => state.actions);
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
        addUser(result);
        window.location.href = "/";
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
