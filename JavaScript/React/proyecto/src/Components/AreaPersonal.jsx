import React from 'react';

function AreaPersonal(){
    var usuario = localStorage.getItem("usuario");
    return (
        <div>
            <h1>Area Personal</h1>
            <h2>Bienvenido {usuario}</h2>
        </div>
    )
}

export default AreaPersonal;