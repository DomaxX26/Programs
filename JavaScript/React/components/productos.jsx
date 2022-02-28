import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from "formik";
import * as Yup from 'yup';


const productosSchema = Yup.object().shape({
  nombre: Yup.string().min(4, 'Too Short!').max(60, 'Too Long!').required('Required'),
  precio: Yup.number().positive('May positive number!').required('Required'),
  tallas: Yup.string().required('Required'),
});


function Productos() {

  const [data, setData] = useState([]);
  const [modalEditar, setmodalEditar] = useState(false);
  const [tipoModal, setTipoModal] = useState("insertar");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { nombre: '', precio: 0, tallas: '' },
    validationSchema: productosSchema,
  });


  useEffect(() => {
    // obtener productos
    peticionGet();

  }, []);

  const peticionGet = () => {
    const url2 = "http://localhost:3003/api/productos"
    const url = "https://api.tendaciclista.ccpegoilesvalls.es/api/productos"
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        "auth-token": `${JSON.parse(localStorage.getItem("tk"))}`
      },
      mode: 'cors' // no-cors, *cors, same-origin  
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data.data);
        setData(data.data.data);
      })

  }

  const valoresFormulario = (tipo, id) => {
    console.log(id, tipo);
    if (tipo === "insertar" || id === undefined) {
      formik.values.nombre = '';
      formik.values.precio = 0;
      formik.values.tallas = '';
    } else {
      const elem = data.find(itm => itm._id === id)
      formik.values._id = id;
      formik.values.nombre = elem.nombre;
      formik.values.precio = elem.precio;
      // pasar array a string
      let tallasStr = "";
      elem.tallas.forEach(it => { tallasStr += it + ' ' })
      formik.values.tallas = tallasStr;
    }

  }

  const modalMostrar = () => {
    setmodalEditar(!modalEditar);
  }


  const peticionPost = () => {
    console.log(formik.values);
    const url = "https://api.tendaciclista.ccpegoilesvalls.es/api/productos";
    const url2 = "http://localhost:3003/api/productos";

    const tallas = formik.values.tallas.trim().split(" ");
    console.log(tallas)
    const data = {
      'nombre': formik.values.nombre,
      'precio': formik.values.precio,
      'tallas': tallas
    };
    console.error(data);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        "auth-token": `${JSON.parse(localStorage.getItem("tk"))}`
      },
      mode: 'cors' // no-cors, *cors, same-origin
    }).then(response => response.json())
      .then(datos => {

        if (datos.error != null) {
          console.log(datos.error);
          setError(datos.error);
        } else {
          console.error("succes", datos);
          peticionGet();
          modalMostrar();
        }
      })
      .catch((errorajax) => {
        console.error('Error:', errorajax);
        setError(errorajax);
      });

  }

  const peticionPut = () => {
    console.log(formik.values);
    const url = "https://api.tendaciclista.ccpegoilesvalls.es/api/productos";
    const url2 = "http://localhost:3003/api/productos";

    const tallas = formik.values.tallas.trim().split(" ");
    console.log(tallas)
    const data = {
      'nombre': formik.values.nombre,
      'precio': formik.values.precio,
      'tallas': tallas
    };
    console.error(data);
    fetch(url + '/' + formik.values._id, {
      method: 'PUT',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        "auth-token": `${JSON.parse(localStorage.getItem("tk"))}`
      },
      mode: 'cors' // no-cors, *cors, same-origin
    }).then(response => response.json())
      .then(datos => {

        if (datos.error != null) {
          console.log(datos.error);
          setError(datos.error);
        } else {
          console.error("succes", datos);
          peticionGet();
          modalMostrar();
        }
      })
      .catch((errorajax) => {
        console.error('Error:', errorajax);
        setError(errorajax);
      });

  }

  return (

    <React.Fragment>
      <h1>Productos</h1>
      <Button onClick={() => { setTipoModal('insertar'); modalMostrar(); valoresFormulario('insertar'); }}>Agregar Producto</Button>

      <table className="table ">
        <thead>
          <tr>
            <th></th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Tallas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(prod => {
            return (
              <tr key={prod._id}>
                <td>{prod.imagen}</td>
                <td>{prod.nombre}</td>
                <td>{prod.precio}</td>
                <td>{
                  prod.tallas.map(ele => ele + " ")
                }</td>
                <td>
                  <button className="btn btn-primary" onClick={() => { setTipoModal('modificar'); valoresFormulario('modificar', prod._id); modalMostrar(); }}><FontAwesomeIcon icon={faEdit} /></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={() => { console.log("borrar") }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>




      <Modal show={modalEditar} onHide={() => modalMostrar()}>
        <Form >
          <Modal.Header closeButton >
            <Modal.Title>{tipoModal === 'insertar' ? "Nuevo " : "Actualizar"} Producto</Modal.Title>

          </Modal.Header>
          <ModalBody>

            <div className="text-danger">{error}</div>
            <div className="form-group">

              <input className="form-control"
                type="hidden"
                name="_id"
                id="_id"
                value={formik.values._id} />
              <br />
              <label htmlFor="nombre">Nombre</label>
              <input className="form-control"
                type="text"
                name="nombre"
                id="nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="text-danger">{formik.errors.nombre}</div>) : null}
              <br />
              <label htmlFor="precio">Precio</label>
              <input className="form-control"
                type="number"
                step="0.1"
                name="precio"
                id="precio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.precio} />
              {formik.touched.precio && formik.errors.precio ? (
                <div className="text-danger">{formik.errors.precio}</div>) : null}
              <br />
              <label htmlFor="imagen">Tallas</label>
              <input className="form-control"
                type="text"
                name="tallas"
                id="tallas"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tallas} />
              {formik.touched.tallas && formik.errors.tallas ? (
                <div className="text-danger">{formik.errors.tallas}</div>) : null}
            </div>
          </ModalBody>

          <ModalFooter>

            {tipoModal === 'insertar' ?
              <Button onClick={() => peticionPost()}>
                Insertar
              </Button> :
              <Button className="btn btn-primary" onClick={() => peticionPut()}>
                Actualizar
              </Button>
            }
            <Button onClick={() => modalMostrar()}>Cancelar</Button>
          </ModalFooter>
        </Form>
      </Modal>




    </React.Fragment>




  )

}




export default Productos; 