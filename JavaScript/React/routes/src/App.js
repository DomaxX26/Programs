import logo from './logo.svg';
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Component/Home';
import Error404 from './Component/Error404';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/404">
            <Error404/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
