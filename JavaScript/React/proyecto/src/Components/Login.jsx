import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from 'yup';


const Signup = yup.object().shape({
  email: yup.string().email('Email Invalido').required('Campo Obligatorio'),
  password: yup.string().min(6, 'Muy Corto!').max(20, 'Muy Largo!').required('Campo Obligatorio'),
});


function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");



  const formik = useFormik({
    initialValues: { email: '',
    password: "" },
    onSubmit: values => {
      fetch("https://api.tendaciclista.ccpegoilesvalls.es/api/login", {
        method: 'POST',
        body: JSON.stringify(values, null, 2),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      }).then(response => response.json())
        .then(data => {
          if (data.error != null) {
            setError(data.error);
          } else { 
            localStorage.setItem("tk", JSON.stringify(data.data.token));
            navigate('/AreaPersonal');
          }
        })
        .catch((error) => {
          setError(error)

        });
    },
    validationSchema: Signup,
  });

  return (
    <div>
      <h1>Login</h1>
      <div className="text-danger">{error}</div>
      <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="email" className='d-flex justify-content-start'>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}

          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger d-flex justify-content-start">{formik.errors.email}</div>) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='d-flex justify-content-start'>Contraseña</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger d-flex justify-content-start">{formik.errors.password}</div>) : null}
        </Form.Group>
        <Form.Group className="mb-3" >
          <Button variant="primary" type="submit">Enviar</Button>
        </Form.Group>
      </Form>
      </Container>

    </div>
  );
}
export default Login; 