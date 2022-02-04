import React, {Component} from 'react';
import propTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      title:'Default',
      time: new Date ().toLocaleDateString(),
      number:0,
      numbers:[]
    }
  }

  changeState(){
    let number = Math.round(Math.random()*4);
    let numbers = this.state.numbers;
    numbers.push(number);

    this.setState({
      time: new Date().toLocaleTimeString(),
      numbers:numbers,
      number: number,
      title:((number % 2 === 0) ? 'It is even' : 'It is odd')
    })
    console.log('changestate--> ', this.state)
  }

  render(){
    console.log('Render was called--> ', this.state);
    const colors = ['red', 'yellow', 'green','blue', 'orange'];
    const color = colors[this.state.number];

    return(
      <div className="App" style={{backgroundColor: color}}>
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">
        {this.state.title} - {this.state.number}
        </h1>
        </header>
        <div className="App-intro">
          <div>{this.state.time}</div>
          Press this button to change state
        </div>
        <div>
          <button onClick={() => this.changeState()}>Change state</button>
        </div>
        <div>
          Generared numbers
          <ul>
            {this.state.numbers.map((x)=>(
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    )

  }
}



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

export default App;
