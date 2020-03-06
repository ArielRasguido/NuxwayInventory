import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

const NavBar = ()=>{
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/login">
                <img id="logo-navbar" src={require('../../assets/logonuxway2.webp')} />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Clientlist">Clientes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Productlist">Productos</Link>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
}
export default NavBar