import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from "formik";

const productos = yup.object().shape({
    nombre: yup.string().min(4, 'Muy Corto!').max(60, 'Muy largo!').required('Campo Obligatorio'),
    precio: yup.number().positive('Numero Positivo!').required('Campo Obligatorio'),
    tallas: yup.string().required('Campo Obligatorio'),
});

function Productos() {

    const [modalEditar, setmodalEditar] = useState(false);
    const [tipoModal, setTipoModal] = useState("insertar");
    const [error, setError] = useState("");

    const [data, setData] = useState([]);

    const formik = useFormik({
        initialValues: { nombre: '', precio: 0, tallas: '' },
        validationSchema: productos,
    });


    const modalMostrar = () => {
        setmodalEditar(!modalEditar);
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

            let tallasStr = "";
            elem.tallas.forEach(it => { tallasStr += it + ' ' })
            formik.values.tallas = tallasStr;
        }

    }

    fetch("https://api.tendaciclista.ccpegoilesvalls.es/api/productos", {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': JSON.parse(localStorage.getItem("tk"))
        },
    }).then(response => response.json())
        .then(data => {
            setData(data.data.data);
        })

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-start">Productos</h1>
                    <Button className="btn btn-primary d-flex justify-content-start" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar Producto</Button>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Table className="table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Tallas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(producto => {
                                return (
                                    <tr key={producto._id}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{
                                            producto.tallas.map(talla => talla + " ")
                                        }</td>
                                        <td>
                                            <button className="btn btn-primary mx-2" onClick={() => { setTipoModal('modificar'); valoresFormulario('modificar', producto._id); modalMostrar(); }}><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" onClick={() => { console.log("Producto a borrar: " + producto.nombre) }}><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Nuevo Producto</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <label name="nombre">Nombre</label>
                                    <input type="text" name="nombre"></input>
                                </div>
                                <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Insertar</button>
                                    <button type="button" className="btn btn-primary">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Productos;