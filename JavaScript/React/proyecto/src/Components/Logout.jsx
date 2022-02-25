import React from 'react';
import { Container, Button } from 'react-bootstrap';
import {useNavigate}  from 'react-router-dom';

function Logout() {
    
    const navigate = useNavigate();

    const eliminarToken =() =>{
        localStorage.clear();
        navigate('/');
    }

    return (
        <div>
            <Container>
                <h1>Logout</h1>
                <h3>Quieres salir de tu perfil de usuario?</h3>
                <Button type="submit" id="enviar" className="mt-2" onClick={()=> eliminarToken()}>Salir</Button>
            </Container>
        </div>
    );
}

export default Logout;