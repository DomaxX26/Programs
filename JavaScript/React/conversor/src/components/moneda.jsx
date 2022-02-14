import React from 'react';

class Moneda extends React.Component{

    handleChange(evt){
        console.log(evt);
    }

render(){

    return(
        <input
            type='number'
            className="form-control"
            onChange={this.handleChange.bind(this)}
        >
        </input>
    )

}

}
export default Moneda;