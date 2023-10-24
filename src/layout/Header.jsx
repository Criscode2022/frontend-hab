import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Button from "@mui/material/Button";
import LogoutButton from "../components/Forms/LogoutForm";
import { AuthContext } from "../context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import "./Header.css";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { userName } = useContext(AuthContext);

  return (
    <header className="header">
      <Link to="/">
        <h1>
          <img src={Logo} alt="Logo" />
        </h1>
      </Link>

      <nav>
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button variant="contained">Iniciar sesión</Button>
            </Link>
            <Link to="/register">
              <Button variant="contained">Registrarse</Button>
            </Link>
          </>
        ) : (
          <Link to="/newPost">
            <IconButton id="add-button"><AddIcon /></IconButton>
          </Link>
        )}
        <LogoutButton />
      </nav>

      <ul>
        <li>
          {isAuthenticated && <h3>¡Hola, {userName}!</h3>}
        </li>
        <li>
          {isAuthenticated && <Link to="/update">
            <PersonIcon id="user-icon" />
          </Link>}
        </li>
      </ul>
    </header>
  );
};

export default Header;
