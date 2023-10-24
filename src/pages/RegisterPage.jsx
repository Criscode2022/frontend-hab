import { useContext } from 'react';
import RegisterForm from '../components/Forms/RegisterForm'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Aside from '../components/aside/Aside';

const RegisterPage = () => {
  const auth = useContext(AuthContext);
  if (auth.token) {
    return <Navigate to="/feed"/>
  }
  return (
    <>
      
      <div className='container'>
        <RegisterForm />
        <Aside></Aside>
      </div>
    </>
  );
};

export default RegisterPage;
