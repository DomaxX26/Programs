import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Register from './Components/Register';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Error404 from './Components/Error404';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Error404" element={<Error404/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
