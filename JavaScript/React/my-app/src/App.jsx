import logo from './logo.svg';
import './App.css';
import React from "react";



class App extends React.Component{
  /*arrowhandleClick = (e) => {
    e.preventDefault ();
    alert('The firts link was clicked.');
    console.log("First Click"); 
  }

  handClick (e){
    e.preventDefault();
    alert('The second link was clicked');
    console.log("Second Click")
  }

  render(){
    return(
      <div className="App">
        <button className="btn btn-danger mt-2" onClick={() => alert("Its works")}>
          Click on this button
        </button>
        <a href="#" className="link-light me-2 border border-waring p-2 mt-2 ms-2 bg-warning rounded" onClick={this.arrowhandleClick}>Click first link</a>
        <a href="#" className="link-light me-2 border border-danger p-2 mt-2 ms-2 bg-danger rounded" onClick={(e) => this.handClick(e)}>Click second link</a>
      </div>
    );
  }*/

  render(){
    const title = this.props.title;
    const tech = this.props.tech;

    console.log(this.props.tech);
    let h1class = {
      textAlign: 'center',
      color: 'red',
      fontWeight: 'bold'
    }

    let h2Class = {
      color:'darkred'
    }

    return(
      <div>
        <h1 style={h1class}>{title}</h1>
        <h2 style={h2Class}>{tech[0]}</h2>
      </div>
    )

  }
}

App.protoTypes = {
  title: this.propTypes.string.isRequired,
  version: this.propTypes.number.isRequired
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
