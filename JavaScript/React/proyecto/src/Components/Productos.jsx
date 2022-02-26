import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

const productos = yup.object().shape({
    nombre: yup.string().min(4, 'Muy Corto!').max(60, 'Muy largo!').required('Campo Obligatorio'),
    precio: yup.number().positive('Numero Positivo!').required('Campo Obligatorio'),
    tallas: yup.string().required('Campo Obligatorio'),
});

function Productos() {

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        validar();
        catchProduct();
    }, []);

    function validar() {
        var token = JSON.parse(localStorage.getItem("tk"))

        if (token == null) {
            navigate('/Login');
        }
    }

    const formik = useFormik({
        initialValues: { nombre: '', precio: 0, tallas: '' },
        validationSchema: productos,
    });

    const insertarProductos = () => {
        formik.values.nombre = '';
        formik.values.precio = 0;
        formik.values.tallas = '';
    }

    const newProduct = () => {
        const tallas = formik.values.tallas.trim().split(" ");
        const product = {
            'nombre': formik.values.nombre,
            'precio': formik.values.precio,
            'tallas': tallas
        };

        fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': JSON.parse(localStorage.getItem("tk")),
            },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }

    const catchProduct = () => {
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
    }

    const editProduct = () => {
        const tallas = formik.values.tallas.split(" ");

        const putData = {
            'nombre': formik.values.nombre,
            'precio': formik.values.precio,
            'tallas': tallas
        };

        fetch("https://api.tendaciclista.ccpegoilesvalls.es/api/productos"+'/'+formik.values._id, {
            method: 'PUT',
            body: JSON.stringify(putData),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "auth-token": JSON.parse(localStorage.getItem("tk"))
            },
        }).then(response => response.json())
            .then(datos => {
                console.log(datos);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error);
            });
    }

    const valuesEdit = (id) => {
        const element = data.find(item => item._id === id); //Buscar el mismo id del array
        let tallasString = " ";
        formik.values._id = id;
        formik.values.nombre = element.nombre;
        formik.values.precio = element.precio;
        element.tallas.forEach(itm => { tallasString = tallasString + itm + ' ' })
        formik.values.tallas = tallasString;
    }


    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-start">Productos</h1>
                    <Button className="btn btn-primary d-flex justify-content-start" data-bs-toggle="modal" data-bs-target="#modalNewProduct" onClick={() => insertarProductos()}>Agregar Producto</Button>
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
                                            <button className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#modalEditProduct" onClick={() => { valuesEdit(producto._id) }} ><i className="bi bi-pencil-square"></i></button>
                                            <button className="btn btn-danger" onClick={() => { console.log("Producto a borrar: " + producto.nombre) }}><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {/*MODAL NEW PRODUCT*/}
                    <div className="modal fade" id="modalNewProduct" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Nuevo Producto</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-danger">{error}</div>
                                    <div className="form-group">
                                        <input className="form-control"
                                            type="hidden"
                                            name="_id"
                                            id="_id"
                                            value={formik.values._id} />
                                        <br />
                                        <label htmlFor="nombre" className='d-flex justify-content-start'>Nombre</label>
                                        <input className="form-control"
                                            type="text"
                                            name="nombre"
                                            id="nombre"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.nombre}
                                        />
                                        {formik.touched.nombre && formik.errors.nombre ? (<div className="text-danger d-flex justify-content-start">{formik.errors.nombre}</div>) : null}
                                        <br />
                                        <label htmlFor="precio" className='d-flex justify-content-start'>Precio</label>
                                        <input className="form-control"
                                            type="number"
                                            name="precio"
                                            id="precio"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.precio} />
                                        {formik.touched.precio && formik.errors.precio ? (<div className="text-danger d-flex justify-content-start">{formik.errors.precio}</div>) : null}
                                        <br />
                                        <label htmlFor="tallas" className='d-flex justify-content-start'>Tallas</label>
                                        <input className="form-control"
                                            type="text"
                                            name="tallas"
                                            id="tallas"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.tallas} />
                                        {formik.touched.tallas && formik.errors.tallas ? (<div className="text-danger d-flex justify-content-start">{formik.errors.tallas}</div>) : null}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => newProduct()}>Insertar</button>
                                    <button type="button" className="btn btn-primary">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*MODAL EDIT PRODUCT*/}
                    <div className="modal fade" id="modalEditProduct" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Actualizar Producto</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-danger">{error}</div>
                                    <div className="form-group">
                                        <input className="form-control"
                                            type="hidden"
                                            name="_id"
                                            id="_id"
                                            value={formik.values._id} />
                                        <br />
                                        <label htmlFor="nombre" className='d-flex justify-content-start'>Nombre</label>
                                        <input className="form-control"
                                            type="text"
                                            name="nombre"
                                            id="nombre"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.nombre}
                                        />
                                        {formik.touched.nombre && formik.errors.nombre ? (<div className="text-danger d-flex justify-content-start">{formik.errors.nombre}</div>) : null}
                                        <br />
                                        <label htmlFor="precio" className='d-flex justify-content-start'>Precio</label>
                                        <input className="form-control"
                                            type="number"
                                            name="precio"
                                            id="precio"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.precio} />
                                        {formik.touched.precio && formik.errors.precio ? (<div className="text-danger d-flex justify-content-start">{formik.errors.precio}</div>) : null}
                                        <br />
                                        <label htmlFor="imagen" className='d-flex justify-content-start'>Tallas</label>
                                        <input className="form-control"
                                            type="text"
                                            name="tallas"
                                            id="tallas"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.tallas} />
                                        {formik.touched.tallas && formik.errors.tallas ? (<div className="text-danger d-flex justify-content-start">{formik.errors.tallas}</div>) : null}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => editProduct()}>Actualizar</button>
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