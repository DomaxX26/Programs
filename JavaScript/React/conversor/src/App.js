import './App.css';
import React from 'react';
import Conversor from './components/conversors';
import { construct } from 'harmony-reflect';


// function App() {  
class App extends React.Component {
  constructor (props){
    super(props)
    this.state={canvi:1.20}
  }

render(){

  return (
    <div className="App">
      <header className="App-header">
      <h1>Conversor de Moneda</h1>
      
        <Conversor canvi={this.state.canvi} />
      </header>
    </div>
  );
};
}

export default App;
