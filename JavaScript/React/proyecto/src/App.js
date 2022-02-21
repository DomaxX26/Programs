import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Register from './Components/Register';
import Footer from './Components/Footer';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Register" element={<Register/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
