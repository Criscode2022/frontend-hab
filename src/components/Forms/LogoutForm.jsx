import { useContext } from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  // Verifica si el token de autenticación está presente en el almacenamiento local
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await auth.logout();
    navigate("/login");
  }

  // Renderiza el botón solo si el usuario está autenticado
  return (
    <>
      {auth.token && (
        <Button variant="contained" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      )}
    </>
  );
};

export default LogoutButton;
