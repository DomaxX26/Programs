import React,{useEffect,useState} from "react";
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Pedidos = () =>{
   
    const [users, setUsers] = useState([]);
   
useEffect( ()=>{
    // obtener productos
obtenerUsuarios();

},[]);

const obtenerUsuarios = () =>{
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(data => {
    console.log(data);
    setUsers(data);
});
}

    return(
        <React.Fragment>
              <h1>Pedidos</h1>
            <Button onClick={()=>{console.log('agregar Pedido'); }}>Agregar Pedido</Button>
 
            <table className="table ">
                 <thead>
                    <tr>    
          <th>Nombre</th>
          <th>email</th>
          <th>telefono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user=>{
          return(
            <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{console.log("modificar");}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{console.log("borrar")}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>
        </React.Fragment>
    );
}


export default Pedidos;