import React from 'react';
import { useNavigate } from 'react-router-dom';


const Error404Page = () => {
    const [counter, setCounter] = React.useState(3);
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/');
    }, 3000);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>

            <h2>Error 404</h2>
            <h3>Ruta no encontrada</h3>
            <p>Redirigiendo en {counter}...</p>
        </>
    );
}

export default Error404Page;
