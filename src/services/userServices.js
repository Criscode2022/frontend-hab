// Función que registra a un usuario.
export const registerService = async (username, password) => {
  const response = await fetch(
    `http://https://backend-hab.onrender.com/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const json = await response.json();

  // Si hay un error lo mostramos
  if (json.status === "error") {
    throw new Error(json.message);
  }
  // Si no devolvemos el token.
  return json.token;
};

// Función que loguea a un usuario.
export const loginService = async (username, password) => {
  const response = await fetch(
    `http://https://backend-hab.onrender.com/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const json = await response.json();

  // Si hay un error lo mostramos.
  if (json.status === "error") {
    throw new Error(json.message);
  }

  // Retornamos el token.
  return json.token;
};

// Función que obtiene los datos de un usuario.
export const getUserService = async (token) => {
  const response = await fetch(
    `http://https://backend-hab.onrender.com/users/getUser`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await response.json();

  // Si hay un error lo mostramos. Dado que esta parte no esta correctamente implementada en el backend, vamos a simular el error.
  if (json.error) {
    alert("Ha habido un error al obtener los datos del usuario");
  }

  // Retornamos los datos del usuario.
  return json.user;
};

// Función que actualiza los datos de un usuario.
export const updateUserService = async (token, fieldsToUpdate) => {
  const response = await fetch(
    `http://https://backend-hab.onrender.com/users/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fieldsToUpdate),
    }
  );

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }

  // Retornamos la respuesta del servidor
  return json.token;
};
