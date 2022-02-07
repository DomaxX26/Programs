import React, {Component} from 'react';
import propTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import Header from './Components/header';
import Paragraph from './Components/paragraph';
import Formulari from './Components/formulari';



class App extends Component{

    showMesg(msg){
      alert('This button works' + msg);
    }

  render(){
    return(
      <div className="App">
          <Formulari/> 
      </div>
    )}

  }


export default App;

/*function App() {
  return (
    <div ">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/


