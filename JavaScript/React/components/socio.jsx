import React from 'react';

const Socio = () => {
  return (
    <React.Fragment>
    <div class="container-sm">
    <h1>Pedido de equipos ciclistas del club</h1>

    <form >
       
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre y Apellidos</label>
            <input type="text" class="form-control" id="nombre" name="nombre"  required />
          </div>
        <div class="mb-3">
          <label for="emailº" class="form-label">Correo electónico</label>
          <input type="email" class="form-control" name="email" id="email"  required placeholder="example@domain.com"  />
        </div>
        <div class="mb-3">
          <label for="telefono" class="form-label">Teléfono</label>
          <input type="text" class="form-control" name="telefono" id="telefono" required placeholder="999 999 999"  />
        </div>
        <div class="mb-3">
          <p id="mensajeError" class="text-danger"></p>
       </div> 
        <button type="submit" class="btn btn-primary" id="siguiente">Siguiente</button>
      </form>
      </div>  
      </React.Fragment>
      )
}

export default Socio;