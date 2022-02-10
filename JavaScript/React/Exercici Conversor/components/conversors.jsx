import React from "react";
import Moneda from './moneda';

class Conversor extends React.Component {
render () {
    return (
        <div className="form-row">
            <div className="form-group col-auto">
                <label  className="col-sm-2 col-form-label" >Dollars</label>
                <Moneda /> 
            </div>
            <div className="col">
                <label className="col-sm-2 col-form-label" >Euros</label>
                <Moneda /> 
            </div>
        </div>    
    )
}
}

export default Conversor;