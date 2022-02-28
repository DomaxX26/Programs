import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import * as yup from 'yup';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

const productos = yup.object().shape({
    nombre: yup.string().min(4, 'Muy Corto!').max(60, 'Muy largo!').required('Campo Obligatorio'),
    precio: yup.number().positive('Numero Positivo!').required('Campo Obligatorio'),
    tallas: yup.string().required('Campo Obligatorio'),
});

function Productos() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [error] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        validar();
        catchProduct();
    });

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

    const editProduct = (evt) => {
        evt.preventDefault();
        let tallas = formik.values.tallas.trim().split(',');
        let product = {
            'nombre': formik.values.nombre,
            'precio': formik.values.precio,
            'tallas': tallas
        }

        fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos/' + formik.values.id, {
            method: 'PUT',
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

    const valuesEdit = (producto) => {
        const talla = producto.tallas.toString();
        
        formik.values.id = producto._id;
        formik.values.nombre = producto.nombre;
        formik.values.precio = producto.precio;
        formik.values.tallas = talla
        setIsModalOpen(true);
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
                                            <button className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#modalEditProduct" onClick={() => { valuesEdit(producto) }} ><i className="bi bi-pencil-square"></i></button>
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
                    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <ModalHeader>
                            <h1>Editar Producte</h1>
                            <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
                                <i className="bi bi-x"></i>
                            </Button>{' '}
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                {/* Camp del nom del producte */}
                                <label htmlFor="nombre" className='mb-2'>Nom del producte</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre}
                                />
                                {formik.touched.nombre && formik.errors.nombre ? (
                                    <div className="text-danger">{formik.errors.nombre}</div>) : null}
                                {/* Camp del preu del producte */}
                                <label htmlFor="precio" className='mt-2 mb-2'>Preu del producte</label>
                                <input
                                    type="number"
                                    name="precio"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.precio}
                                />
                                {formik.touched.precio && formik.errors.precio ? (
                                    <div className="text-danger">{formik.errors.precio}</div>) : null}
                                <label htmlFor="talla" className='mt-2 mb-2'>Talla del producte</label>
                                <input
                                    type="text"
                                    name="tallas"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.tallas}
                                />
                                {formik.touched.tallas && formik.errors.tallas ? (
                                    <div className="text-danger">{formik.errors.tallas}</div>) : null}
                                <button className='btn btn-primary' onClick={(evt) => editProduct(evt)}>
                                    Actualizar
                                </button>
                                <button className='btn btn-secondary' type="button" onClick={(evt) => { evt.preventDefault(); setIsModalOpen(false) }}>
                                    Cancelar
                                </button>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>

                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}

export default Productos;