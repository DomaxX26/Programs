import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from 'yup';



const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(6,'Too Short!').max(255,'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(20, 'Too Long!').required('Required'),
  passwordc: Yup.string()
              .min(6, 'Too Short!')
              .max(20, 'Too Long!')
              .oneOf([Yup.ref('password'), null], "Passwords don't match!")
              .required('Required'),

});



function Register() {
    
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name:'', email: '', password:"", passwordc:''},
    onSubmit: values => {



       console.log(values);
      
    const url = "https://api.tendaciclista.ccpegoilesvalls.es/api/register";
    const url2 = "http://localhost:3003/api/register";
    const data = {
        'name': values.name,
        'email': values.email,
        'password': values.password
    };
    console.error(data);
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Accept': 'application/json, text/plain, */*',  
          'Content-Type': 'application/json'
        },
        mode: 'cors' // no-cors, *cors, same-origin
    }).then(response => response.json())
    .then(data => {
        
        if(data.error != null){
          console.log(data.error);
          setError(data.error);
      }else{
        console.error("succes",data);
        navigate('/login');
      }
    })
    .catch((errorajax) => {
      console.error('Error:', errorajax);
      setError( errorajax);
    });
    

      },
    validationSchema: RegisterSchema,
    });

    return(

        <div className="container">
          <h1>Registrar nuevo usuario</h1>
          <div className="text-danger">{error}</div>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name">Nombre</Form.Label>
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
                <div className="text-danger">{formik.errors.name}</div> ) : null}
        </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Correo electrónico</Form.Label>
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
                 <div className="text-danger">{formik.errors.email}</div> ) : null}
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label htmlFor="password">Contraseña</Form.Label>
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
                  <div className="text-danger">{formik.errors.password}</div> ) : null} 
              </Col>
              <Col>
                <Form.Label htmlFor="passwordc">Repetir contraseña</Form.Label>
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
          <div className="text-danger">{formik.errors.passwordc}</div> ) : null}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mt-2">
          <Button 
              type="submit" 
              id="enviar" 
              >Registrar</Button>
          </Form.Group>
        </Form>

      </div>
    );

  
} 

export default Register; 