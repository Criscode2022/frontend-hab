import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';








const RegisterForm = () => {
  const auth = useContext(AuthContext);
  const { loading } = useContext(AuthContext);

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  async function handleSubmit(e, auth) {

    e.preventDefault();
    const data = new FormData(e.target);
    const result = {};
    data.forEach((k, v) => (result[v] = k));

    try {
      await auth.register(result.username, result.password);
      toast.success("Usuario registrado correctamente", {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {
      setErrors({
        ...errors,
        username: " ",
        password: error.message,
      });
    }
  }


  return (
    <div className='flex'>
      <h2>Registrarse</h2>
      <form onSubmit={(e) => handleSubmit(e, auth)}>
        <TextField required={true} error={Boolean(errors.username)}
          label="Usuario" name="username" />
        <TextField required={true} label="Contraseña" helperText={errors.password}
          error={Boolean(errors.password)}
          type="password" name="password" />
        <Button disabled={auth.loading} variant="contained" type="submit">
          Enviar
        </Button>
      </form>
      {loading && (
        <div>
          <CircularProgress />
          <p style={{ margin: '20px', fontWeight: 'bold' }}>
            Nota: la carga inicial puede tardar unos segundos mientras se enciende el servidor
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
