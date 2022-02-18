import React from 'react';
import { Container, Row, Col, FloatingLabel, Form, Button } from 'react-bootstrap';

const Header = () => {

    const afegirTasca = () =>{
        console.log("Hola");
    }
    
    return (
        <header className='App-header'>
        <Container>
            <Row>
                <Col>
                    <h1 className="d-flex justify-content-start mb-4">Nova Tasca</h1>
                </Col>  
            </Row>
            
                <Row>
                    <Col>
                        <FloatingLabel controlId="floatingInput" className="mb-3">
                            <Form.Control type="text" />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <Button variant="primary" className="mt-2 d-flex justify-content-start" onClick={afegirTasca}>Afegir Tasca</Button>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;
