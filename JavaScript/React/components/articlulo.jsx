import React from 'react';

const Articlulo = (props) => {
  return (
    <div className="container-sm">
        <H1>Pedido Ciclista</H1>
        <div className="row">
          <div className="col-7">
            <h2 id="nombreApellidos"></h2>
          </div>
        <div className="col-3 pull-left">
          <h1 className="text-end" id="total">0 €</h1>
        </div>
      </div>

        <div className="row">
        <div className="col-7">
        
        <form > 
            <div className="mb-3">
                <label for="nombreArticulo" className="form-label">Prenda</label>
                <input type="text" className="form-control" id="nombreArticulo" name="nombreArticulo" readonly disabled value="" />
              </div>
            <div className="mb-3">
              <label for="precioArticulo" className="form-label">Precio</label>
              <input type="email" className="form-control" name="precioArticulo" id="precioArticulo" readonly disabled value=""/>
            </div>
            
            <div className="mb-3">
              <select className="form-select" aria-label="Seleecona la talla " id="talla" name="talla">
                <option value="" selected>Talla</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
              </div>
              <div className="mb-3">
                <p id="mensajeError" className="text-danger"></p>
             </div> 
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-primary me-md-2" id="siguiente">Siguiente</button>
            </div>
            </form>
            </div>
            <div className="col-3">
                
              <img src="img/maillot.jpg" className="rounded img-fluid" alt="Imagen del producto" id="imagen"/>
             </div>
          </div>

            
    </div>

  )
}

export default Articlulo