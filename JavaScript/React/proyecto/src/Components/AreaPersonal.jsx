import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function AreaPersonal(){
    var usuario = localStorage.getItem("usuario");
    const navigate = useNavigate();

    useEffect(() => {
        validar();
    }, []);

    function validar() {
        var token = JSON.parse(localStorage.getItem("tk"))

        if (token == null) {
            navigate('/Login');
        }
    }
    return (
        <div>
            <h1>Area Personal</h1>
            <h2>Bienvenido {usuario}</h2>
        </div>
    )
}

export default AreaPersonal;