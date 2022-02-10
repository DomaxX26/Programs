import './App.css';
import React from 'react';
import Conversor from './components/conversors';


// function App() {  
class App extends React.Component {

render(){

  return (
    <div className="App">
      <header className="App-header">
      <h1>Conversor de Moneda</h1>
      
        <Conversor />
      </header>
    </div>
  );
};
}

export default App;
