import { useContext } from 'react';
import UpdateForm from '../components/Forms/UpdateForm'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
const UpdatePage = () => {
  const auth = useContext(AuthContext);
  if (!auth.token) {
    return <Navigate to="/feed" />
  }
  return (
    <>
      <h2> Actualizar perfil</h2>
      <div className='center'>
        <UpdateForm></UpdateForm>
      </div>
    </>
  )
}

export default UpdatePage
