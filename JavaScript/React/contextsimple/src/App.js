import logo from './logo.svg';
import './App.css';
import {valores, appContext} from './Components/contextData';
import Header from  './Components/Header';

function App() {
  localStorage.setItem("data", JSON.stringify({color:'red'}));
  return (
    <div className="App">
    <appContext.Provider value={valores}>
        <Header/>
      </appContext.Provider>
    </div>
  );
}

export default App;
