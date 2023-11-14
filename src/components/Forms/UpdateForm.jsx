import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



function UpdateForm() {
  const navigate = useNavigate();
  const { userName } = useContext(AuthContext);


  const [formData, setFormData] = useState({
    username: userName,
    biography: "",
    avatar: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    biography: "",
    avatar: "",
    newPassword: "",
  });

  const auth = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpiar el mensaje de error del campo actual
  };

  const handleDeleteUser = async () => {
    try {
      // Muestra un cuadro de diálogo de confirmación al usuario
      const shouldDelete = window.confirm("¿Seguro que quieres eliminar tu perfil y toda su actividad asocidada? Esta acción no puede ser revertida.");

      if (shouldDelete) {
        const url = "https://backend-hab.onrender.com/users/delete";
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, requestOptions);
        const jsonResponse = await response.json();

        if (!response.ok) {
          throw new Error(jsonResponse.message);
        } else {
          toast.success("Perfil borrado correctamente", {
            position: toast.POSITION.TOP_CENTER
          });
          navigate("/login");
          auth.logout();
        }
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Filtrar los campos que tienen valores
      const filteredFormData = Object.keys(formData).reduce((acc, key) => {
        if (formData[key]) {
          acc[key] = formData[key];
        }
        return acc;
      }, {});

      const url = "https://backend-hab.onrender.com/users/update";
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filteredFormData),
      };
      const response = await fetch(url, requestOptions);
      const jsonResponse = await response.json();

      if (response.status === 400 && jsonResponse.fields?.length) {
        // Si la respuesta tiene un estado 400 (Bad Request), maneja los errores
        setErrors({
          username: jsonResponse.fields.includes("username")
            ? jsonResponse.message
            : "",
          biography: jsonResponse.fields.includes("biography")
            ? jsonResponse.message
            : "",
          avatar: jsonResponse.fields.includes("avatar")
            ? jsonResponse.message
            : "",
          newPassword: jsonResponse.fields.includes("newPassword")
            ? jsonResponse.message
            : "",
        });
      } else if (!response.ok) {
        throw new Error(jsonResponse.message);
      } else {
        auth.update(formData); // Actualiza el token en el AuthContext
        toast.success("Perfil actualizado correctamente", {
          position: toast.POSITION.TOP_CENTER
        })
        // Limpia los mensajes de error de todos los campos en caso de éxito
        setErrors({
          username: "",
          biography: "",
          avatar: "",
          newPassword: "",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Nombre de usuario"
          onChange={handleChange}
          id="username"
          name="username"
          value={formData.username || userName}
          helperText={errors.username}
          error={Boolean(errors.username)}
        />
        <TextField
          type="text"
          label="Biografía"
          onChange={handleChange}
          id="biography"
          name="biography"
          value={formData.biography}
          helperText={errors.biography}
          error={Boolean(errors.biography)}
        />
        <TextField
          type="text"
          label="URL de avatar"
          onChange={handleChange}
          id="avatar"
          name="avatar"
          value={formData.avatar}
          helperText={errors.avatar}
          error={Boolean(errors.avatar)}
        />
        <TextField
          type="password"
          label="Nueva contraseña"
          onChange={handleChange}
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          helperText={errors.newPassword}
          error={Boolean(errors.newPassword)}
        />
        <Button type="submit" variant="contained">
          Actualizar perfil
        </Button>
      </form>


      <Button variant="contained" color='error' style={{ width: '50%', margin: '50px 0 50px 0' }} onClick={handleDeleteUser}>
        Borrar perfil
      </Button>
    </>
  );
}

export default UpdateForm;
