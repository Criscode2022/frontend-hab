import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function NewPostForm() {
  // Obtener el token del AuthContext
  const { token } = useContext(AuthContext);

  const [postData, setpostData] = useState({
    url: "",
    titulo: "",
    descripcion: "",
    image: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setpostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Datos del formulario a enviar:", postData); // Verificar los datos del formulario que estás enviando
      console.log("Token de autenticación:", token); // Verificar el token

      const response = await fetch(`http://https://backend-hab.onrender.com/posts/newPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Adjuntar el token en el encabezado de la solicitud
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData), // Envía el objeto postData sin el userId
      });

      const responseData = await response.json();

      console.log("Respuesta del servidor:", responseData); // Verificar la respuesta del servidor

      if (!response.ok) {
        throw new Error(responseData.error || "No se pudo crear el enlace");
      }

      toast.success("Enlace creado correctamente", {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      console.error("Error al crear el enlace:", error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        label="Título"
        name="titulo"
        value={postData.titulo}
        onChange={handleInputChange}
      />
      <TextField
        required
        label="URL"
        name="url"
        value={postData.url}
        onChange={handleInputChange}
      />
      <TextField
        required
        label="Descripción"
        name="descripcion"
        value={postData.descripcion}
        onChange={handleInputChange}
      />
      <TextField
        label="Imagen del enlace"
        name="image"
        value={postData.image}
        onChange={handleInputChange}
      />
      <Button type="submit" variant="contained">Crear Enlace</Button>
    </form>
  );
}

export default NewPostForm;

