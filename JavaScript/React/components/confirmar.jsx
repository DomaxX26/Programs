import React from 'react'

const Confirmar = () => {
  return (
    
    <div className="container-md">
      <h1>Resumen del pedido</h1>
      <h3 id="nombreApellidos"> </h3>
      <div className="row">
        <div className="col-sm-6">
        
        
    
        <div className="card mt-2" style="width: 25rem;">
          <h5 className="card-header">Maillot</h5>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="card-title">46 €</h3>
                <p className="card-text">Talla XL</p>
                <a href="#" className="btn btn-primary text-end"><i className="fa fa-trash-o" aria-hidden="true"></i>
                </a>

              </div>
              <div className="col ">
                <img src="./img/maillot.jpg" className="img-fluid img-thumbnail" />
              </div>
            </div>

          </div>
        </div>
      </div>

        <div className="card mt-2" style="width: 25rem;">
          <h5 className="card-header">TOTAL</h5>
          <div className="card-body">
            <h1 className="card-title"></h1>
            <div className="d-flex align-items-end flex-column">
            <a href="#" className="btn btn-primary">Enviar</a>
          </div>
          </div>
        </div>

      </div>
    </div>
    )
}

export default Confirmar;