import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Contacto() {

    const navigate = useNavigate();

    useEffect(() => {
        console.log(navigate);
    })

    const enviarHome = () => {
        console.log("envia ");

        navigate('/');

    }
    return (

        <React.Fragment>
            <h1>Contacto</h1>
            <Button onClick={enviarHome}>Go Home</Button>
        </React.Fragment>
    )
}
export default Contacto; 