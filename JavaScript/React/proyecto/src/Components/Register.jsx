import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';



const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(6, 'Muy Corto!').max(255, 'Muy largo!').required('Campo Obligatorio'),
    email: Yup.string().email('Email Invalido').required('Campo Obligatorio'),
    password: Yup.string().min(6, 'Muy Corto!').max(20, 'Muy largo!').required('Campo Obligatorio'),
    passwordc: Yup.string()
        .min(6, 'Muy Corto!')
        .max(20, 'Muy largo!')
        .oneOf([Yup.ref('password'), null], "No Coincides las Contraseñas!")
        .required('Campo Obligatorio'),

});



function Register() {

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { name: '', 
        email: '', 
        password: "", 
        passwordc: '' 
    },
        onSubmit: values => {
            const dates = {
                'name': values.name,
                'email': values.email,
                'password': values.password
            };
            console.error(dates);
            fetch("https://api.tendaciclista.ccpegoilesvalls.es/api/register", {
                method: 'POST',
                body: JSON.stringify(dates),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then(response => response.json())
                .then(data => {

                    if (data.error != null) {
                        console.log(data.error);
                        setError(data.error);
                    } else {
                        console.error("succes", data);
                        navigate('/Login');
                    }
                })
                .catch((errorajax) => {
                    console.error('Error:', errorajax);
                    setError(errorajax);
                });


        },
        validationSchema: RegisterSchema,
    });

    return (

        <div className="container">
            <h1>Registrar nuevo usuario</h1>
            <div className="text-danger">{error}</div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="name" className="d-flex justify-content-start">Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Introducir nombre"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger d-flex justify-content-start mb-2">{formik.errors.name}</div>) : null}
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="email" className="d-flex justify-content-start">Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Introducir email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger d-flex justify-content-start mb-2">{formik.errors.email}</div>) : null}
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="password" className="d-flex justify-content-start">Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-danger d-flex justify-content-start">{formik.errors.password}</div>) : null}
                        </Col>
                        <Col>
                            <Form.Label htmlFor="passwordc" className="d-flex justify-content-start">Repetir contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                id="passwordc"
                                name="passwordc"
                                placeholder=" Repetir contraseña"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordc}
                            />
                            {formik.touched.passwordc && formik.errors.passwordc ? (
                                <div className="text-danger d-flex justify-content-start">{formik.errors.passwordc}</div>) : null}
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Button
                        type="submit"
                        id="enviar"
                        className="d-flex justify-content-start"
                    >Registrar</Button>
                </Form.Group>
            </Form>

        </div>
    );


}

export default Register; 