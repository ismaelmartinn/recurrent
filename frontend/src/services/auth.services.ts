async function getUser() {
  const response = await fetch("http://localhost:3000/auth/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error al obtener el usuario");
  }

  return response.json();
}

export default getUser;
