import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Component/Home';
import About from './Component/About';
import Categoria from './Component/Categories';
import Contacto from './Component/Contacto';
import Error404 from './Component/Error404';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <React.Fragment>

      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Categoria/:id" element={<Categoria/>}/>
          <Route path="/Contacto" element={<Contacto/>}/>
          <Route path="/404" element={<Error404 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
      <Footer />

    </React.Fragment>
  );
}

export default App;
