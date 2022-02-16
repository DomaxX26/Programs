import React, {useContext} from 'react';
import {appContext} from './contextData';

const Header = () => {
    
    const valors = useContext(appContext);
    const color1 = JSON.parse(localStorage.getItem('data'));
    
    return (
        <header className="App-header">Header <h1 style={{color:color1.color}}>{valors.title}</h1></header>
    )
}

export default Header;
