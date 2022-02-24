import React from 'react';
import { useParams } from 'react-router-dom';
import Socio from './socio';
import Confirmar from './confirmar';

const Tienda = () => {
 const {estado} = useParams();
  
    if ( estado==='Soci' || estado===undefined ){
    return ( 
        <React.Fragment>
        <div>Socio</div>
        <Socio/>
        </React.Fragment>
      )
    }else if(estado==='confirmar'){
      return ( 
        <React.Fragment>
        <div>Confirmar</div>
        <Confirmar/>
        </React.Fragment>
      )
      }
      
    


}
export default Tienda;
